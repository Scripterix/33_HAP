import { isMaterialId } from './material-registry.mjs';

export const EVALUATION_STATUSES = [
  'Nowy', 'Inkubacja', 'Do ewaluacji', 'Do eksperymentu', 'Prototyp', 'Odrzucony'
];

const isActive = evaluation => evaluation.data?.status !== 'Odrzucony';

export function validateEvaluations(evaluations, registry) {
  const errors = [];
  const evaluationIds = new Set();
  const activeByIdea = new Map();
  const ideaIds = new Set(registry.materials.filter(item => item.materialType === 'idea').map(item => item.materialId));

  for (const evaluation of evaluations) {
    const data = evaluation.data || evaluation;
    if (!isMaterialId(data.evaluationId)) errors.push(`Niepoprawny evaluationId w ${evaluation.id || '(bez id)'}.`);
    if (evaluationIds.has(data.evaluationId)) errors.push(`Duplikat evaluationId: ${data.evaluationId}.`);
    evaluationIds.add(data.evaluationId);
    if (!isMaterialId(data.ideaId)) errors.push(`Niepoprawny ideaId w ${evaluation.id || data.evaluationId || '(bez id)'}.`);
    else if (!ideaIds.has(data.ideaId)) errors.push(`Osierocona ewaluacja ${data.evaluationId}: nie istnieje pomysł ${data.ideaId}.`);
    if (!EVALUATION_STATUSES.includes(data.status)) errors.push(`Niepoprawny status ewaluacji ${data.evaluationId}.`);
    if (isActive({ data })) activeByIdea.set(data.ideaId, (activeByIdea.get(data.ideaId) || 0) + 1);
  }

  for (const [ideaId, count] of activeByIdea) {
    if (count > 1) errors.push(`Pomysł ${ideaId} ma więcej niż jedną aktywną ewaluację.`);
  }
  return { valid: errors.length === 0, errors };
}

export function findActiveEvaluation(evaluations, ideaId) {
  return evaluations.find(evaluation => evaluation.data?.ideaId === ideaId && isActive(evaluation)) || null;
}
