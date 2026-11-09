export const COST_REASONS = {
  MISSING_USAGE: 'missing_usage',
  UNKNOWN_PRICING: 'unknown_pricing',
  INVALID_USAGE: 'invalid_usage'
};

const isNonNegativeInteger = value => Number.isInteger(value) && value >= 0;

export function normalizeUsage(usage) {
  if (!usage) return null;
  const inputTokens = usage.inputTokens ?? usage.input_tokens;
  const cachedInputTokens = usage.cachedInputTokens
    ?? usage.input_tokens_details?.cached_tokens
    ?? usage.inputTokensDetails?.cachedTokens
    ?? 0;
  const outputTokens = usage.outputTokens ?? usage.output_tokens;

  if (![inputTokens, cachedInputTokens, outputTokens].every(isNonNegativeInteger)) return null;
  if (cachedInputTokens > inputTokens) return null;
  return { inputTokens, cachedInputTokens, outputTokens };
}

export function calculateRunCost(usageInput, rateSnapshot, usdPlnRate = null) {
  if (!usageInput) return { cost: null, reason: COST_REASONS.MISSING_USAGE };
  const usage = normalizeUsage(usageInput);
  if (!usage) return { cost: null, reason: COST_REASONS.INVALID_USAGE };
  if (!rateSnapshot) return { cost: null, reason: COST_REASONS.UNKNOWN_PRICING };

  const { inputUsdPerMillion, cachedInputUsdPerMillion, outputUsdPerMillion } = rateSnapshot;
  if (![inputUsdPerMillion, cachedInputUsdPerMillion, outputUsdPerMillion]
    .every(value => Number.isFinite(value) && value >= 0)) {
    return { cost: null, reason: COST_REASONS.UNKNOWN_PRICING };
  }

  const nonCachedInputTokens = usage.inputTokens - usage.cachedInputTokens;
  const usd = nonCachedInputTokens / 1_000_000 * inputUsdPerMillion
    + usage.cachedInputTokens / 1_000_000 * cachedInputUsdPerMillion
    + usage.outputTokens / 1_000_000 * outputUsdPerMillion;
  const validRate = Number.isFinite(usdPlnRate) && usdPlnRate > 0 ? usdPlnRate : null;

  return {
    cost: {
      usd,
      pln: validRate ? usd * validRate : null,
      usdPlnRate: validRate
    },
    reason: null
  };
}

export function calculateArticleCost(runs = []) {
  const uniqueRuns = [];
  const seen = new Set();
  for (const run of runs) {
    if (!run?.runId || seen.has(run.runId)) continue;
    seen.add(run.runId);
    uniqueRuns.push(run);
  }

  if (!uniqueRuns.length) return { cost: null, missingRuns: 0, duplicateRuns: runs.length };
  const missingRuns = uniqueRuns.filter(run => !run.cost).length;
  if (missingRuns) {
    return { cost: null, missingRuns, duplicateRuns: runs.length - uniqueRuns.length };
  }

  const usd = uniqueRuns.reduce((sum, run) => sum + run.cost.usd, 0);
  const hasPln = uniqueRuns.every(run => Number.isFinite(run.cost.pln));
  return {
    cost: {
      usd,
      pln: hasPln ? uniqueRuns.reduce((sum, run) => sum + run.cost.pln, 0) : null
    },
    missingRuns: 0,
    duplicateRuns: runs.length - uniqueRuns.length
  };
}

export function formatCost(value, currency) {
  if (!Number.isFinite(value)) return 'Brak danych';
  const digits = Math.abs(value) > 0 && Math.abs(value) < 0.01 ? 4 : 2;
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency', currency, minimumFractionDigits: digits, maximumFractionDigits: digits
  }).format(value);
}
