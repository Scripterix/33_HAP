import test from 'node:test';
import assert from 'node:assert/strict';
import { findActiveEvaluation, validateEvaluations } from '../src/lib/evaluation-validation.mjs';
import { loadMaterialRegistry } from '../src/lib/material-registry.mjs';

const registry = await loadMaterialRegistry();
const ideaId = 'd1bf2c12-d4fd-4463-ab3b-f55e6278ebcd';
const evaluation = {
  id: 'godzina-ktorej-nikt-nie-przezyl',
  data: {
    evaluationId: 'b71c4f83-42b0-46a8-91cd-8f935b73ef13',
    ideaId,
    status: 'Nowy'
  }
};

test('ewaluacja wstępna wskazuje istniejący pomysł i nie zmienia statusu publikacji', () => {
  assert.equal(registry.materials.some(m => m.materialId === ideaId && m.materialType === 'idea'), true);
  assert.deepEqual(validateEvaluations([evaluation], registry), { valid: true, errors: [] });
  assert.equal(findActiveEvaluation([evaluation], ideaId), evaluation);
});

test('odrzucona ewaluacja nie jest aktywną ewaluacją pomysłu', () => {
  const rejected = { ...evaluation, data: { ...evaluation.data, status: 'Odrzucony' } };
  assert.equal(validateEvaluations([rejected], registry).valid, true);
  assert.equal(findActiveEvaluation([rejected], ideaId), null);
});

test('nie wolno utworzyć dwóch aktywnych ewaluacji dla tego samego pomysłu', () => {
  const second = {
    ...evaluation,
    data: { ...evaluation.data, evaluationId: 'ae8f0b2e-543c-4dd5-88d4-bbce3e7e81bb' }
  };
  const result = validateEvaluations([evaluation, second], registry);
  assert.equal(result.valid, false);
  assert.match(result.errors.join(' '), /więcej niż jedną aktywną ewaluację/);
});
