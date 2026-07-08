import { EQUIPMENT_SPECS } from '../../data/equipment/equipmentSpecs.js';
import { distance2D } from '../../utils/geometry.js';
import { INCIDENT_SCENARIOS } from '../../data/scenarios/incidentScenarios.js';

// Constantes de simulação — aproximações razoáveis para o MVP.
// Fase futura: calibrar com dados reais de operação (ScoringEngine).
const TEAM_SPEED_MPS = 3; // velocidade média de deslocamento de uma equipe a pé
const DETECTION_DELAY_SECONDS = 5; // tempo médio de detecção automática

function findNearestRespondingEquipment(equipments, target) {
  let nearest = null;
  let nearestDist = Infinity;

  for (const eq of equipments) {
    const spec = EQUIPMENT_SPECS[eq.type];
    if (!spec) continue;
    if (spec.category !== 'monitoramento' && spec.category !== 'controle') continue;

    const d = distance2D(target, { x: eq.position.x, z: eq.position.z });
    if (d < nearestDist) {
      nearestDist = d;
      nearest = eq;
    }
  }

  return { equipment: nearest, distance: nearest ? nearestDist : null };
}

/**
 * Motor de Ocorrências (Seção 19 do PRD).
 *
 * Dado um tipo de cenário e um ponto no evento, calcula:
 * - qual equipamento (câmera/sensor/torre) está mais próximo pra "responder"
 * - o tempo estimado de resposta (detecção + deslocamento da equipe)
 * - a sequência de passos do cenário, com carimbo de tempo aproximado
 *
 * Puro por design — não sabe nada de animação ou 3D; a camada visual
 * (IncidentMarker, IncidentPanel) só lê o resultado e anima em cima dele.
 */
export function simulateIncident(scenarioType, event, equipments, targetPosition) {
  const scenario = INCIDENT_SCENARIOS[scenarioType];
  if (!scenario) {
    throw new Error(`Cenário de ocorrência desconhecido: ${scenarioType}`);
  }

  const { equipment, distance } = findNearestRespondingEquipment(equipments, targetPosition);
  const teamTravelSeconds = distance != null ? Math.round(distance / TEAM_SPEED_MPS) : 30;
  const responseTimeSeconds = DETECTION_DELAY_SECONDS + teamTravelSeconds;

  const steps = scenario.stepsTemplate.map((label, i) => ({
    label,
    atSeconds: Math.round((responseTimeSeconds / scenario.stepsTemplate.length) * (i + 1)),
  }));

  return {
    scenarioType,
    scenarioLabel: scenario.label,
    targetPosition,
    respondingEquipmentId: equipment?.id ?? null,
    steps,
    responseTimeSeconds,
  };
}
