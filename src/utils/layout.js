import { estimateGroundDimensions } from './geometry.js';

/**
 * Funções puras de layout, compartilhadas entre a camada visual
 * (three/Environment/Environment.jsx) e o motor de posicionamento
 * (simulation/placementEngine). Existir em um único lugar evita que o
 * terreno e os equipamentos "discordem" sobre onde ficam as entradas,
 * o palco e o estacionamento.
 */

export function computeGroundDimensions(event) {
  return estimateGroundDimensions(event.areaSqm);
}

export function computeEntrancePositions(event) {
  const { width, depth } = computeGroundDimensions(event);
  const count = Math.max(1, event.entrances);
  const spacing = width / (count + 1);
  return Array.from({ length: count }, (_, i) => ({
    x: -width / 2 + spacing * (i + 1),
    y: 0,
    z: depth / 2 - 5,
  }));
}

export function computeStagePosition(event) {
  const { depth } = computeGroundDimensions(event);
  return { x: 0, y: 0, z: -depth / 2 + 15 };
}

export function computeParkingPosition(event) {
  const { width, depth } = computeGroundDimensions(event);
  return { x: width / 2 - 20, y: 0, z: -depth / 2 + 15 };
}
