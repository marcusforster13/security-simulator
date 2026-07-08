/**
 * Funções geométricas puras, sem dependência de Three.js ou React.
 * Usadas pelo PlacementEngine e CoverageEngine (Fase 5/6).
 * Mantidas puras de propósito: precisam ser testáveis sem WebGL.
 */

/** Distância euclidiana 2D entre dois pontos {x, z} (plano do chão). */
export function distance2D(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

/**
 * Verifica se um ponto está dentro do campo de visão (cone) de um equipamento.
 * @param {{x:number, z:number}} point - ponto a testar
 * @param {{x:number, z:number}} origin - posição do equipamento
 * @param {number} headingDegrees - direção para onde o equipamento aponta (0 = eixo +z)
 * @param {number} fovDegrees - abertura do campo de visão
 * @param {number} rangeMeters - alcance máximo
 */
export function isPointInFieldOfView(point, origin, headingDegrees, fovDegrees, rangeMeters) {
  const dist = distance2D(point, origin);
  if (dist > rangeMeters) return false;

  // 360 graus (sensores, torres) sempre cobre, se dentro do alcance
  if (fovDegrees >= 360) return true;

  const angleToPoint = (Math.atan2(point.x - origin.x, point.z - origin.z) * 180) / Math.PI;
  let diff = Math.abs(angleToPoint - headingDegrees);
  if (diff > 180) diff = 360 - diff;

  return diff <= fovDegrees / 2;
}

/** Área aproximada de um evento retangular, dado m² informado no formulário. */
export function estimateGroundDimensions(areaSqm) {
  const side = Math.sqrt(areaSqm);
  return { width: side, depth: side };
}
