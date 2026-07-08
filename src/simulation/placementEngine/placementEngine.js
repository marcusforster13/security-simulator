import {
  computeGroundDimensions,
  computeEntrancePositions,
  computeParkingPosition,
} from '../../utils/layout.js';

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `eq-${idCounter}`;
}

/**
 * Motor de Posicionamento Inteligente (Seção 17 do PRD).
 *
 * Decisão de arquitetura (registrada na análise inicial): isto é um motor
 * de REGRAS determinísticas, não uma IA/LLM. É rápido, previsível e
 * testável — a "IA" conversacional (Painel de Inteligência, Seção 34,
 * e Sistema de IA, Seção 21) entra na Fase 3 do roadmap de produto e
 * pode reaproveitar o campo `reason` de cada equipamento gerado aqui
 * como base para as respostas, sem precisar reinventar a lógica.
 *
 * Puro por design: não importa nada de three.js ou React, só os dados
 * do evento — testável isoladamente.
 */
export function generateInitialPlacement(event) {
  const equipments = [];
  const { width, depth } = computeGroundDimensions(event);

  // Regra: câmera PTZ em cada entrada (fluxo de acesso)
  computeEntrancePositions(event).forEach((pos) => {
    equipments.push({
      id: nextId(),
      type: 'camera_ptz',
      position: { x: pos.x, y: 0, z: pos.z },
      heading: 180, // entradas ficam na borda +z; câmera aponta para dentro do evento
      reason: 'Câmera PTZ posicionada na entrada para cobrir o fluxo de acesso do público.',
    });
  });

  // Regra: torre central — base operacional sempre presente
  equipments.push({
    id: nextId(),
    type: 'tower',
    position: { x: 0, y: 0, z: 0 },
    heading: 0,
    reason: 'Torre central para observação geral e ponto de referência da operação.',
  });

  // Regra: área > 30.000 m² -> drone adicional
  const droneCount = event.areaSqm > 30000 ? 2 : 1;
  for (let i = 0; i < droneCount; i += 1) {
    equipments.push({
      id: nextId(),
      type: 'drone_standard',
      position: { x: (i === 0 ? -1 : 1) * (width / 4), y: 0, z: depth / 4 },
      heading: 0,
      reason:
        droneCount > 1
          ? 'Área aberta acima de 30.000 m² recomenda cobertura aérea complementar.'
          : 'Cobertura aérea geral do evento.',
    });
  }

  // Regra: estacionamento ativo -> câmera de longo alcance
  if (event.hasParking) {
    const parkingPos = computeParkingPosition(event);
    equipments.push({
      id: nextId(),
      type: 'camera_ptz',
      position: { x: parkingPos.x, y: 0, z: parkingPos.z },
      heading: 180,
      reason: 'Estacionamento ativo recomenda câmera de longo alcance.',
    });
  }

  // Regra: um sensor por área restrita declarada
  for (let i = 0; i < event.restrictedAreas; i += 1) {
    equipments.push({
      id: nextId(),
      type: 'sensor',
      position: { x: -width / 2 + 10 + i * 8, y: 0, z: 0 },
      heading: 0,
      reason: 'Sensor posicionado para monitorar área restrita declarada no cadastro.',
    });
  }

  return equipments;
}
