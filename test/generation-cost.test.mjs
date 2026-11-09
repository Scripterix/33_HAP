import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateArticleCost, calculateRunCost, COST_REASONS } from '../src/lib/generation-cost.mjs';
import { validateGenerationSidecar } from '../src/lib/generation-metadata.mjs';
import { validateEvaluations } from '../src/lib/evaluation-validation.mjs';
import { calculateProjectStats } from '../src/lib/project-stats.mjs';

const dreamId = '11111111-1111-4111-8111-111111111111';
const ideaId = '22222222-2222-4222-8222-222222222222';
const evaluationId = '33333333-3333-4333-8333-333333333333';
const runId = '44444444-4444-4444-8444-444444444444';
const secondRunId = '55555555-5555-4555-8555-555555555555';
const rates = {
  inputUsdPerMillion: 1,
  cachedInputUsdPerMillion: 0.5,
  outputUsdPerMillion: 2,
  pricingVersion: 'test',
  effectiveAt: '2026-01-01'
};

const registry = {
  schemaVersion: 1,
  materials: [
    { materialId: dreamId, materialType: 'dream', slug: 'sen' },
    { materialId: ideaId, materialType: 'idea', slug: 'pomysl', sourceMaterialId: dreamId }
  ]
};

const pricedRun = (id = runId, usd = 1) => ({
  runId: id,
  purpose: 'dream_generation',
  provider: 'openai',
  model: 'test-model',
  usage: { inputTokens: 1, cachedInputTokens: 0, outputTokens: 1 },
  rateSnapshot: rates,
  cost: { usd, pln: null, usdPlnRate: null },
  costReason: null,
  calculatedAt: '2026-01-01T00:00:00.000Z',
  processVersion: 'test-v1'
});

test('liczy zwykłe input i output tokens', () => {
  const result = calculateRunCost({ inputTokens: 1_000_000, cachedInputTokens: 0, outputTokens: 500_000 }, rates);
  assert.equal(result.reason, null);
  assert.equal(result.cost.usd, 2);
});

test('oddzielnie liczy cached input tokens', () => {
  const result = calculateRunCost({ inputTokens: 1_000_000, cachedInputTokens: 400_000, outputTokens: 0 }, rates);
  assert.equal(result.cost.usd, 0.8);
});

test('sumuje kilka wywołań artykułu', () => {
  const result = calculateArticleCost([pricedRun(runId, 0.4), pricedRun(secondRunId, 0.6)]);
  assert.equal(result.cost.usd, 1);
});

test('brak usage nie jest zerowym kosztem', () => {
  const result = calculateRunCost(null, rates);
  assert.equal(result.cost, null);
  assert.equal(result.reason, COST_REASONS.MISSING_USAGE);
});

test('nieznany model zachowuje usage, ale koszt pozostaje nieznany', () => {
  const usage = { inputTokens: 10, cachedInputTokens: 2, outputTokens: 3 };
  const result = calculateRunCost(usage, null);
  assert.equal(result.cost, null);
  assert.equal(result.reason, COST_REASONS.UNKNOWN_PRICING);
  assert.deepEqual(usage, { inputTokens: 10, cachedInputTokens: 2, outputTokens: 3 });
});

test('historyczny koszt nie zależy od zmiany aktualnego cennika', () => {
  const run = pricedRun(runId, 0.75);
  const currentPricing = { ...rates, inputUsdPerMillion: 999 };
  assert.equal(calculateArticleCost([run]).cost.usd, 0.75);
  assert.equal(currentPricing.inputUsdPerMillion, 999);
});

test('waliduje kompletny sidecar', () => {
  const sidecar = { schemaVersion: 1, materialId: dreamId, materialType: 'dream', slug: 'sen', runs: [pricedRun()] };
  assert.equal(validateGenerationSidecar(sidecar).valid, true);
  assert.equal(validateGenerationSidecar({ ...sidecar, materialId: 'zły-id' }).valid, false);
});

test('wykrywa osieroconą ewaluację i niepoprawny ideaId', () => {
  const orphan = [{ id: 'eval', data: { evaluationId, ideaId: '66666666-6666-4666-8666-666666666666', status: 'Nowy' } }];
  assert.equal(validateEvaluations(orphan, registry).valid, false);
  const invalid = [{ id: 'eval', data: { evaluationId, ideaId: 'nie-id', status: 'Nowy' } }];
  assert.equal(validateEvaluations(invalid, registry).valid, false);
});

test('wykrywa duplikat aktywnej ewaluacji', () => {
  const evaluations = [
    { id: 'a', data: { evaluationId, ideaId, status: 'Nowy' } },
    { id: 'b', data: { evaluationId: '77777777-7777-4777-8777-777777777777', ideaId, status: 'Inkubacja' } }
  ];
  assert.equal(validateEvaluations(evaluations, registry).valid, false);
});

test('statystyki obsługują brak metadanych', () => {
  const stats = calculateProjectStats({ registry, sidecars: [], evaluations: [] });
  assert.equal(stats.registeredCostUsd, null);
  assert.equal(stats.missingCostMaterials, 2);
});

test('ten sam runId nie jest liczony podwójnie', () => {
  const sidecars = [
    { materialId: dreamId, runs: [pricedRun(runId, 0.5)] },
    { materialId: ideaId, runs: [pricedRun(runId, 0.5)] }
  ];
  const stats = calculateProjectStats({ registry, sidecars, evaluations: [] });
  assert.equal(stats.registeredCostUsd, 0.5);
  assert.equal(stats.registeredRuns, 1);
});
