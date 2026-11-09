export function calculateProjectStats({ registry, sidecars = [], evaluations = [] }) {
  const dreams = registry.materials.filter(item => item.materialType === 'dream').length;
  const ideas = registry.materials.filter(item => item.materialType === 'idea').length;
  const sidecarsByMaterial = new Map(sidecars.map(sidecar => [sidecar.materialId, sidecar]));
  const seenRuns = new Set();
  let registeredCostUsd = 0;
  let registeredRuns = 0;

  for (const sidecar of sidecars) {
    for (const run of sidecar.runs || []) {
      if (!run.runId || seenRuns.has(run.runId)) continue;
      seenRuns.add(run.runId);
      if (Number.isFinite(run.cost?.usd)) {
        registeredCostUsd += run.cost.usd;
        registeredRuns++;
      }
    }
  }

  const missingCostMaterials = registry.materials.filter(material => {
    const sidecar = sidecarsByMaterial.get(material.materialId);
    return !sidecar?.runs?.length || sidecar.runs.some(run => !Number.isFinite(run.cost?.usd));
  }).length;

  return {
    dreams,
    ideas,
    evaluations: evaluations.length,
    experiments: evaluations.filter(item => item.data?.experimentStarted === true).length,
    prototypes: evaluations.filter(item => item.data?.status === 'Prototyp').length,
    registeredCostUsd: registeredRuns ? registeredCostUsd : null,
    missingCostMaterials,
    registeredRuns
  };
}
