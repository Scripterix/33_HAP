import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { calculateRunCost, normalizeUsage } from './generation-cost.mjs';
import { isMaterialId, UUID_PATTERN } from './material-registry.mjs';
import { writeJsonAtomic } from './atomic-json.mjs';

const RUN_PURPOSES = new Set(['dream_generation', 'idea_interpretation', 'editing']);
const COST_REASONS = new Set(['missing_usage', 'unknown_pricing', 'invalid_usage']);

export function validateGenerationSidecar(sidecar) {
  const errors = [];
  if (sidecar?.schemaVersion !== 1) errors.push('Nieobsługiwana wersja sidecara.');
  if (!isMaterialId(sidecar?.materialId)) errors.push('Niepoprawny materialId sidecara.');
  if (!['dream', 'idea'].includes(sidecar?.materialType)) errors.push('Niepoprawny materialType sidecara.');
  if (typeof sidecar?.slug !== 'string' || !sidecar.slug) errors.push('Brak sluga sidecara.');
  if (!Array.isArray(sidecar?.runs)) return { valid: false, errors: [...errors, 'Brak tablicy runs.'] };

  const runIds = new Set();
  for (const run of sidecar.runs) {
    if (typeof run?.runId !== 'string' || !UUID_PATTERN.test(run.runId)) errors.push('Niepoprawny runId.');
    if (runIds.has(run.runId)) errors.push(`Duplikat runId: ${run.runId}.`);
    runIds.add(run.runId);
    if (!RUN_PURPOSES.has(run?.purpose)) errors.push(`Niepoprawny purpose dla ${run.runId}.`);
    if (typeof run?.provider !== 'string' || !run.provider) errors.push(`Brak provider dla ${run.runId}.`);
    if (typeof run?.model !== 'string' || !run.model) errors.push(`Brak modelu dla ${run.runId}.`);
    if (run.usage !== null && !normalizeUsage(run.usage)) errors.push(`Niepoprawne usage dla ${run.runId}.`);
    if (run.rateSnapshot !== null) {
      const rates = [run.rateSnapshot?.inputUsdPerMillion, run.rateSnapshot?.cachedInputUsdPerMillion, run.rateSnapshot?.outputUsdPerMillion];
      if (!rates.every(value => Number.isFinite(value) && value >= 0)) errors.push(`Niepoprawny snapshot stawek dla ${run.runId}.`);
    }
    if (typeof run?.calculatedAt !== 'string' || Number.isNaN(Date.parse(run.calculatedAt))) errors.push(`Niepoprawny calculatedAt dla ${run.runId}.`);
    if (typeof run?.processVersion !== 'string' || !run.processVersion) errors.push(`Brak processVersion dla ${run.runId}.`);
    if (run.cost === null && !COST_REASONS.has(run.costReason)) errors.push(`Brak prawidłowej przyczyny nieznanego kosztu dla ${run.runId}.`);
    if (run.cost !== null && run.costReason !== null) errors.push(`Koszt i costReason nie mogą występować razem dla ${run.runId}.`);
    if (run.cost !== null && (!Number.isFinite(run.cost?.usd) || run.cost.usd < 0)) errors.push(`Niepoprawny koszt dla ${run.runId}.`);
  }
  return { valid: errors.length === 0, errors };
}

export function createGenerationRun({ purpose, provider = 'openai', model, usage, rateSnapshot, usdPlnRate = null, processVersion }) {
  const normalizedUsage = normalizeUsage(usage);
  const { cost, reason } = calculateRunCost(usage, rateSnapshot, usdPlnRate);
  return {
    runId: randomUUID(),
    purpose,
    provider,
    model,
    usage: normalizedUsage,
    rateSnapshot: rateSnapshot ? { ...rateSnapshot } : null,
    cost,
    costReason: reason,
    calculatedAt: new Date().toISOString(),
    processVersion
  };
}

export const generationSidecarPath = (root, materialType, materialId) =>
  path.join(root, 'data', 'generation', materialType, `${materialId}.json`);

export async function saveGenerationSidecar(root, sidecar) {
  const validation = validateGenerationSidecar(sidecar);
  if (!validation.valid) throw new Error(validation.errors.join(' '));
  await writeJsonAtomic(generationSidecarPath(root, sidecar.materialType, sidecar.materialId), sidecar);
}

export async function loadGenerationSidecar(root, materialType, materialId) {
  try {
    const parsed = JSON.parse(await readFile(generationSidecarPath(root, materialType, materialId), 'utf8'));
    const validation = validateGenerationSidecar(parsed);
    if (!validation.valid) throw new Error(validation.errors.join(' '));
    return parsed;
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

export async function loadAllGenerationSidecars(root = process.cwd()) {
  const results = [];
  for (const materialType of ['dream', 'idea']) {
    const directory = path.join(root, 'data', 'generation', materialType);
    let files = [];
    try { files = await readdir(directory); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    for (const file of files.filter(name => name.endsWith('.json'))) {
      const parsed = JSON.parse(await readFile(path.join(directory, file), 'utf8'));
      const validation = validateGenerationSidecar(parsed);
      if (!validation.valid) throw new Error(`${file}: ${validation.errors.join(' ')}`);
      results.push(parsed);
    }
  }
  return results;
}
