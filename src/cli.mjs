import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { generate } from './openai.mjs';
import { getModelPricing } from '../config/model-pricing.mjs';
import { findMaterial, findMaterialById, loadMaterialRegistry, saveMaterialRegistry } from './lib/material-registry.mjs';
import { createGenerationRun, loadAllGenerationSidecars, loadGenerationSidecar, saveGenerationSidecar } from './lib/generation-metadata.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dreams = path.join(root, 'sny-iskry');
const ideas = path.join(root, 'automatyzacje-md');
const safeName = name => /^[\p{L}\p{N}._-]+\.md$/u.test(name) && !name.startsWith('.') && name !== '..';
const slug = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/ł/g, 'l').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 55);
const date = () => new Date().toISOString().slice(0, 10);
async function saveNew(dir, basename, content) {
  await mkdir(dir, { recursive: true });
  for (let index = 0; index < 100; index++) {
    const suffix = index ? `-${index}` : '';
    const file = path.join(dir, `${basename}${suffix}.md`);
    try { await writeFile(file, content, { flag: 'wx' }); return file; }
    catch (e) { if (e.code !== 'EEXIST') throw e; }
  }
  throw new Error('Nie udało się znaleźć wolnej nazwy pliku');
}

async function recordGeneration({ filepath, materialType, sourceSlug = null, result, purpose, processVersion }) {
  const materialSlug = path.basename(filepath, '.md');
  const registry = await loadMaterialRegistry(root);
  let material = findMaterial(registry, materialType, materialSlug);

  if (!material) {
    material = { materialId: randomUUID(), materialType, slug: materialSlug };
    if (materialType === 'idea') {
      const source = findMaterial(registry, 'dream', sourceSlug);
      if (!source) throw new Error(`Brak materialId źródłowego snu: ${sourceSlug}.`);
      material.sourceMaterialId = source.materialId;
    }
    registry.materials.push(material);
    await saveMaterialRegistry(root, registry);
  }

  const configuredRate = getModelPricing(result.model);
  const usdPlnValue = process.env.USD_PLN_RATE ? Number(process.env.USD_PLN_RATE) : null;
  const run = createGenerationRun({
    purpose,
    model: result.model,
    usage: result.usage,
    rateSnapshot: configuredRate,
    usdPlnRate: Number.isFinite(usdPlnValue) && usdPlnValue > 0 ? usdPlnValue : null,
    processVersion
  });
  const sidecar = await loadGenerationSidecar(root, materialType, material.materialId) || {
    schemaVersion: 1,
    materialId: material.materialId,
    materialType,
    slug: materialSlug,
    runs: []
  };
  sidecar.slug = materialSlug;
  sidecar.runs.push(run);
  await saveGenerationSidecar(root, sidecar);
  return { materialId: material.materialId, run };
}

async function recordWithoutRiskingContent(options) {
  try {
    return await recordGeneration(options);
  } catch (error) {
    console.error(`UWAGA: treść została zapisana, ale zapis metadanych generowania nie powiódł się: ${error.message}`);
    process.exitCode = 1;
    return null;
  }
}
async function list() {
  for (const [name, dir] of [['Sny', dreams], ['Automatyzacje', ideas]]) {
    console.log(`\n${name}:`);
    for (const item of (await readdir(dir)).filter(x => x.endsWith('.md')).sort()) console.log(' -', item);
  }
}
async function check() {
  const files = (await readdir(dreams)).filter(x => x.endsWith('.md'));
  if (!files.length) throw new Error('Brak snów do pracy');
  for (const file of files) {
    const content = await readFile(path.join(dreams, file), 'utf8');
    if (content.trim().length < 100) throw new Error(`Podejrzanie krótki sen: ${file}`);
  }
  const registry = await loadMaterialRegistry(root);
  const ideaFiles = (await readdir(ideas)).filter(x => x.endsWith('.md') && x !== 'README.md');
  const expected = [
    ...files.map(file => ({ materialType: 'dream', slug: path.basename(file, '.md') })),
    ...ideaFiles.map(file => ({ materialType: 'idea', slug: path.basename(file, '.md') }))
  ];
  for (const item of expected) {
    if (!findMaterial(registry, item.materialType, item.slug)) throw new Error(`Brak materialId: ${item.materialType}/${item.slug}.`);
  }
  if (registry.materials.length !== expected.length) throw new Error('Rejestr materiałów zawiera brakujący lub nadmiarowy wpis.');

  const sidecars = await loadAllGenerationSidecars(root);
  for (const sidecar of sidecars) {
    const material = findMaterialById(registry, sidecar.materialId);
    if (!material) throw new Error(`Osierocony sidecar: ${sidecar.materialId}.`);
    if (material.materialType !== sidecar.materialType || material.slug !== sidecar.slug) {
      throw new Error(`Sidecar ${sidecar.materialId} nie odpowiada rejestrowi materiałów.`);
    }
  }
  console.log(`OK: ${files.length} snów, ${ideaFiles.length} pomysłów, ${sidecars.length} sidecarów; brak wymaganego połączenia z API.`);
}
async function writer(filename) {
  if (!filename || !safeName(filename)) throw new Error('Podaj nazwę pliku .md, np. npm run writer -- sen-o-trzecim-krzesle.md');
  const dream = await readFile(path.join(dreams, filename), 'utf8');
  const instructions = await readFile(path.join(root, 'config/writer.md'), 'utf8');
  const result = await generate(instructions, `Sen źródłowy: ${filename}\n\n${dream}`);
  const output = `<!-- SOURCE: sny-iskry/${filename} -->\n\n${result.text}\n`;
  const filepath = await saveNew(ideas, `${path.basename(filename, '.md')}-automatyzacja`, output);
  const metadata = await recordWithoutRiskingContent({
    filepath,
    materialType: 'idea',
    sourceSlug: path.basename(filename, '.md'),
    result,
    purpose: 'idea_interpretation',
    processVersion: 'writer-v1'
  });
  console.log(`Zapisano interpretację Writera: ${path.relative(root, filepath)}`);
  if (metadata) console.log(`Material ID: ${metadata.materialId}; run ID: ${metadata.run.runId}`);
  console.log(`Zużycie tokenów (API): ${JSON.stringify(result.usage || {})}`);
}
async function dream() {
  const instructions = await readFile(path.join(root, 'config/dream.md'), 'utf8');
  const result = await generate(instructions, 'Napisz nowy, oryginalny Sen Iskry. Topic free.');
  const filename = await saveNew(dreams, `${date()}-sen-iskry`, result.text + '\n');
  const metadata = await recordWithoutRiskingContent({
    filepath: filename,
    materialType: 'dream',
    result,
    purpose: 'dream_generation',
    processVersion: 'dream-v1'
  });
  console.log(`Zapisano: ${path.relative(root, filename)}`);
  if (metadata) console.log(`Material ID: ${metadata.materialId}; run ID: ${metadata.run.runId}`);
  console.log(`Zużycie tokenów (API): ${JSON.stringify(result.usage || {})}`);
}
try {
  const [command, arg] = process.argv.slice(2);
  if (command === 'list') await list();
  else if (command === 'check') await check();
  else if (command === 'writer') await writer(arg);
  else if (command === 'dream') await dream();
  else throw new Error('Komendy: npm run list | check | dream | writer -- NAZWA_SNU.md');
} catch (e) { console.error('Błąd:', e.message); process.exitCode = 1; }
