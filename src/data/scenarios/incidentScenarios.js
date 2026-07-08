/**
 * Templates dos cenários de ocorrência (Seção 35: Invasão, Furto, Briga,
 * Pessoa perdida, Objeto suspeito, Acesso restrito).
 *
 * O fluxo genérico (Seção 19) é: evento acontece -> detecção automática
 * (sensor/câmera) -> central recebe alerta -> equipe é acionada. Cada
 * cenário usa esse mesmo esqueleto com labels específicos — dado puro,
 * sem lógica; o IncidentEngine é quem calcula tempos e equipamento
 * respondendo.
 */
export const INCIDENT_SCENARIOS = {
  invasao: {
    label: 'Invasão de área restrita',
    stepsTemplate: [
      'Pessoa entra em área restrita',
      'Sensor detecta movimentação',
      'Câmera mais próxima aponta para o local',
      'Central de monitoramento recebe alerta',
      'Equipe de segurança é acionada',
    ],
  },
  furto: {
    label: 'Furto',
    stepsTemplate: [
      'Ocorrência identificada por câmera ou testemunha',
      'Câmera mais próxima é direcionada ao local',
      'Central de monitoramento recebe alerta',
      'Equipe de segurança é acionada',
    ],
  },
  briga: {
    label: 'Briga',
    stepsTemplate: [
      'Movimentação incomum na multidão',
      'Câmera identifica aglomeração',
      'Central de monitoramento recebe alerta',
      'Equipe de segurança é acionada',
    ],
  },
  pessoa_perdida: {
    label: 'Pessoa perdida',
    stepsTemplate: [
      'Solicitação de busca recebida',
      'Câmeras da região são verificadas',
      'Central de monitoramento coordena a busca',
      'Equipe é direcionada ao ponto mais provável',
    ],
  },
  objeto_suspeito: {
    label: 'Objeto suspeito',
    stepsTemplate: [
      'Objeto suspeito identificado',
      'Câmera mais próxima confirma a ocorrência',
      'Central de monitoramento recebe alerta',
      'Equipe especializada é acionada',
      'Área é isolada preventivamente',
    ],
  },
  acesso_restrito: {
    label: 'Acesso restrito não autorizado',
    stepsTemplate: [
      'Tentativa de acesso não autorizado detectada',
      'Sensor da área confirma a violação',
      'Central de monitoramento recebe alerta',
      'Equipe de segurança intercepta o acesso',
    ],
  },
};

export const INCIDENT_SCENARIO_TYPES = Object.keys(INCIDENT_SCENARIOS);
