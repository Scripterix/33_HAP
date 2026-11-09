import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { writeJsonAtomic } from './atomic-json.mjs';

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const isMaterialId = value => typeof value === 'string' && UUID_PATTERN.test(value);

export function validateMaterialRegistry(registry) {
  const errors = [];
  if (registry?.schemaVersion !== 1) errors.push('Nieobsługiwana wersja rejestru materiałów.');
  if (!Array.isArray(registry?.materials)) return { valid: false, errors: [...errors, 'Brak tablicy materials.'] };

  const ids = new Set();
  const keys = new Set();
  for (const material of registry.materials) {
    if (!isMaterialId(material.materialId)) errors.push(`Niepoprawny materialId: ${material.materialId || '(brak)'}.`);
    if (ids.has(material.materialId)) errors.push(`Duplikat materialId: ${material.materialId}.`);
    ids.add(material.materialId);
    if (!['dream', 'idea'].includes(material.materialType)) errors.push(`Niepoprawny materialType dla ${material.materialId}.`);
    if (typeof material.slug !== 'string' || !material.slug) errors.push(`Brak sluga dla ${material.materialId}.`);
    const key = `${material.materialType}:${material.slug}`;
    if (keys.has(key)) errors.push(`Duplikat materiału: ${key}.`);
    keys.add(key);
  }

  const dreams = new Set(registry.materials.filter(item => item.materialType === 'dream').map(item => item.materialId));
  for (const idea of registry.materials.filter(item => item.materialType === 'idea')) {
    if (!isMaterialId(idea.sourceMaterialId) || !dreams.has(idea.sourceMaterialId)) {
      errors.push(`Pomysł ${idea.materialId} nie ma prawidłowego źródłowego snu.`);
    }
  }
  return { valid: errors.length === 0, errors };
}

export async function loadMaterialRegistry(root = process.cwd()) {
  const filepath = path.join(root, 'data', 'materials.json');
  const registry = JSON.parse(await readFile(filepath, 'utf8'));
  const validation = validateMaterialRegistry(registry);
  if (!validation.valid) throw new Error(validation.errors.join(' '));
  return registry;
}

export async function saveMaterialRegistry(root, registry) {
  const validation = validateMaterialRegistry(registry);
  if (!validation.valid) throw new Error(validation.errors.join(' '));
  await writeJsonAtomic(path.join(root, 'data', 'materials.json'), registry);
}

export const findMaterial = (registry, materialType, slug) =>
  registry.materials.find(item => item.materialType === materialType && item.slug === slug) || null;

export const findMaterialById = (registry, materialId) =>
  registry.materials.find(item => item.materialId === materialId) || null;
