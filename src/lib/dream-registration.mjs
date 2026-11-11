import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { findMaterial, loadMaterialRegistry, saveMaterialRegistry } from './material-registry.mjs';

const safeName = name => typeof name === 'string'
  && /^[\p{L}\p{N}._-]+\.md$/u.test(name)
  && !name.startsWith('.')
  && name !== '..';

async function readDream(root, filename) {
  if (!safeName(filename)) throw new Error('Podaj nazwę pliku .md z sny-iskry/, np. ocean-na-lisciu.md');
  const filepath = path.join(root, 'sny-iskry', filename);
  let content;
  try {
    content = await readFile(filepath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') throw new Error(`Nie znaleziono snu: sny-iskry/${filename}.`);
    throw error;
  }
  if (content.trim().length < 100) throw new Error(`Podejrzanie krótki sen: ${filename}`);
  return { filepath, content, slug: path.basename(filename, '.md') };
}

export async function registerDream(root, filename) {
  const dream = await readDream(root, filename);
  const registry = await loadMaterialRegistry(root);
  const existing = findMaterial(registry, 'dream', dream.slug);
  if (existing) return { material: existing, created: false };

  const material = { materialId: randomUUID(), materialType: 'dream', slug: dream.slug };
  registry.materials.push(material);
  await saveMaterialRegistry(root, registry);
  return { material, created: true };
}

export async function loadRegisteredDream(root, filename) {
  const dream = await readDream(root, filename);
  const registry = await loadMaterialRegistry(root);
  const material = findMaterial(registry, 'dream', dream.slug);
  if (!material) {
    throw new Error(`Sen ${dream.slug} nie jest zarejestrowany. Uruchom: npm run dream:register -- ${filename}`);
  }
  return dream;
}
