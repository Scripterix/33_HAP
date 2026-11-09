export const PRICING_VERSION = '2026-11-09';

const gpt5Mini = {
  inputUsdPerMillion: 0.25,
  cachedInputUsdPerMillion: 0.025,
  outputUsdPerMillion: 2,
  pricingVersion: PRICING_VERSION,
  effectiveAt: '2026-11-09',
  source: 'https://developers.openai.com/api/docs/models/gpt-5-mini'
};

const gpt4oMini = {
  inputUsdPerMillion: 0.15,
  cachedInputUsdPerMillion: 0.075,
  outputUsdPerMillion: 0.6,
  pricingVersion: PRICING_VERSION,
  effectiveAt: '2026-11-09',
  source: 'https://developers.openai.com/api/docs/models/gpt-4o-mini'
};

export const MODEL_PRICING = {
  'gpt-5-mini': gpt5Mini,
  'gpt-5-mini-2025-08-07': gpt5Mini,
  'gpt-4o-mini': gpt4oMini,
  'gpt-4o-mini-2024-07-18': gpt4oMini
};

export const getModelPricing = model => MODEL_PRICING[model] || null;
