import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { registerDream } from '../src/lib/dream-registration.mjs';
import { writer } from '../src/cli.mjs';

const validDream = '# Sen przygotowany wcześniej\n\n' + 'Treść snu Iskry. '.repeat(12);

async function createProject(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'hap-dream-registration-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'sny-iskry'), { recursive: true });
  await mkdir(path.join(root, 'data'), { recursive: true });
  await writeFile(path.join(root, 'data', 'materials.json'), JSON.stringify({ schemaVersion: 1, materials: [] }));
  return root;
}

test('rejestruje istniejący sen z ID i slugiem zgodnym z nazwą kolekcji Astro', async t => {
  const root = await createProject(t);
  await writeFile(path.join(root, 'sny-iskry', 'sen-z-chatgpt.md'), validDream);

  const result = await registerDream(root, 'sen-z-chatgpt.md');

  assert.equal(result.created, true);
  assert.equal(result.material.materialType, 'dream');
  assert.equal(result.material.slug, 'sen-z-chatgpt');
  assert.match(result.material.materialId, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  assert.deepEqual(Object.keys(result.material).sort(), ['materialId', 'materialType', 'slug']);
  await assert.rejects(readdir(path.join(root, 'data', 'generation')), { code: 'ENOENT' });
});

test('ponowny import jest idempotentny i zachowuje istniejący UUID', async t => {
  const root = await createProject(t);
  await writeFile(path.join(root, 'sny-iskry', 'sen-z-chatgpt.md'), validDream);

  const first = await registerDream(root, 'sen-z-chatgpt.md');
  const second = await registerDream(root, 'sen-z-chatgpt.md');
  const registry = JSON.parse(await readFile(path.join(root, 'data', 'materials.json'), 'utf8'));

  assert.equal(first.material.materialId, second.material.materialId);
  assert.equal(second.created, false);
  assert.equal(registry.materials.length, 1);
});

test('zgłasza brak pliku i nie zmienia rejestru', async t => {
  const root = await createProject(t);

  await assert.rejects(registerDream(root, 'brak.md'), /Nie znaleziono snu/);
  const registry = JSON.parse(await readFile(path.join(root, 'data', 'materials.json'), 'utf8'));
  assert.deepEqual(registry.materials, []);
});

test('Writer odrzuca niezarejestrowany sen przed wywołaniem API', async t => {
  const root = await createProject(t);
  await writeFile(path.join(root, 'sny-iskry', 'niezarejestrowany.md'), validDream);
  let apiCalled = false;

  await assert.rejects(
    writer('niezarejestrowany.md', { projectRoot: root, generateFn: async () => { apiCalled = true; } }),
    /npm run dream:register -- niezarejestrowany\.md/
  );
  assert.equal(apiCalled, false);
});

test('odrzuca zbyt krótki plik Markdown', async t => {
  const root = await createProject(t);
  await writeFile(path.join(root, 'sny-iskry', 'krotki.md'), '# Krótki sen');

  await assert.rejects(registerDream(root, 'krotki.md'), /Podejrzanie krótki sen/);
});
