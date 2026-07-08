/**
 * Especificações técnicas de cada tipo de equipamento.
 * Baseado na Seção 16 (Equipment) e Seção 32 (Menu de Equipamentos) do PRD.
 *
 * Este arquivo é dado puro (sem lógica). O PlacementEngine e o CoverageEngine
 * leem daqui para decidir onde posicionar e como calcular cobertura.
 * Quando o produto evoluir para modelos reais (Fase 4 do PRD), estes números
 * podem vir de um banco de dados em vez de um arquivo estático.
 */
export const EQUIPMENT_SPECS = {
  camera_fixed: {
    label: 'Câmera Fixa',
    category: 'monitoramento',
    rangeMeters: 60,
    fovDegrees: 90,
    heightMeters: 5,
    rotates: false,
  },
  camera_ptz: {
    label: 'Câmera PTZ Inteligente',
    category: 'monitoramento',
    rangeMeters: 150,
    fovDegrees: 120,
    heightMeters: 8,
    rotates: true, // 360 graus, conforme Seção 16 do PRD
  },
  camera_thermal: {
    label: 'Câmera Térmica',
    category: 'monitoramento',
    rangeMeters: 100,
    fovDegrees: 100,
    heightMeters: 8,
    rotates: false,
  },
  drone_standard: {
    label: 'Drone Padrão',
    category: 'aereo',
    rangeMeters: 200,
    fovDegrees: 140,
    heightMeters: 30,
    rotates: true,
  },
  drone_thermal: {
    label: 'Drone Térmico',
    category: 'aereo',
    rangeMeters: 180,
    fovDegrees: 130,
    heightMeters: 30,
    rotates: true,
  },
  sensor: {
    label: 'Sensor',
    category: 'controle',
    rangeMeters: 25,
    fovDegrees: 360,
    heightMeters: 2,
    rotates: false,
  },
  tower: {
    label: 'Torre de Observação',
    category: 'controle',
    rangeMeters: 120,
    fovDegrees: 360,
    heightMeters: 12,
    rotates: false,
  },
};

export const EQUIPMENT_TYPES = Object.keys(EQUIPMENT_SPECS);
