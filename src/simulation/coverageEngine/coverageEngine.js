import { EQUIPMENT_SPECS } from '../../data/equipment/equipmentSpecs.js';
import { isPointInFieldOfView } from '../../utils/geometry.js';

/**
 * CoverageEngine (Seção 18 do PRD).
 *
 * Cria uma malha de pontos sobre o terreno e, para cada ponto, verifica
 * quantos equipamentos o enxergam (dentro do alcance E do campo de visão).
 *
 * Classificação por ponto:
 * - 0 equipamentos cobrindo -> 'blind'   (vermelho)
 * - 1 equipamento cobrindo  -> 'partial' (amarelo)
 * - 2+ equipamentos cobrindo -> 'covered' (verde) — redundância de cobertura
 *
 * Nota de performance (risco já identificado na análise de arquitetura):
 * esta função é O(células × equipamentos). Para o tamanho de grid usado no
 * MVP (~1600 células) e poucos equipamentos, roda em poucos milissegundos
 * na main thread. Se o produto evoluir para eventos muito grandes ou grids
 * mais finos, mover para um Web Worker é o próximo passo — a função já é
 * pura e sem dependência de React/Three, então essa migração não exige
 * reescrever a lógica, só trocar onde ela é chamada.
 */
export function computeCoverage(equipments, groundWidth, groundDepth, options = {}) {
  const cellSize = options.cellSize ?? Math.max(2, Math.max(groundWidth, groundDepth) / 40);
  const cols = Math.max(1, Math.round(groundWidth / cellSize));
  const rows = Math.max(1, Math.round(groundDepth / cellSize));

  const cells = [];
  let blindSpotCount = 0;

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = -groundWidth / 2 + cellSize * (c + 0.5);
      const z = -groundDepth / 2 + cellSize * (r + 0.5);

      let coveringCount = 0;
      for (const eq of equipments) {
        const spec = EQUIPMENT_SPECS[eq.type];
        if (!spec) continue;

        const covered = isPointInFieldOfView(
          { x, z },
          { x: eq.position.x, z: eq.position.z },
          eq.heading ?? 0,
          spec.fovDegrees,
          spec.rangeMeters
        );
        if (covered) coveringCount += 1;
      }

      let status = 'blind';
      if (coveringCount >= 2) status = 'covered';
      else if (coveringCount === 1) status = 'partial';

      if (status === 'blind') blindSpotCount += 1;

      cells.push({ x, z, status, coveringCount });
    }
  }

  // "Cobertura = área monitorada / área total" (Seção 18 do PRD).
  // Área monitorada = qualquer célula com pelo menos 1 equipamento cobrindo.
  const monitoredCount = cells.length - blindSpotCount;
  const coveragePercent = cells.length > 0 ? (monitoredCount / cells.length) * 100 : 0;

  return {
    cellSize,
    cols,
    rows,
    width: groundWidth,
    depth: groundDepth,
    cells,
    coveragePercent,
    blindSpotCount,
  };
}
