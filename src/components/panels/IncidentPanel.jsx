import { useEffect, useRef, useState } from 'react';
import { useProjectStore } from '../../store/useProjectStore.js';
import { simulateIncident } from '../../simulation/incidentEngine/incidentEngine.js';
import { INCIDENT_SCENARIOS, INCIDENT_SCENARIO_TYPES } from '../../data/scenarios/incidentScenarios.js';
import { computeGroundDimensions } from '../../utils/layout.js';

/**
 * "Modo Simulação" (Seção 35 do PRD): usuário escolhe uma ocorrência,
 * clica em "Iniciar Simulação", e o painel mostra o avanço passo a passo
 * até o alerta ser resolvido, com o tempo estimado de resposta no final.
 *
 * O ponto do incidente é sorteado dentro dos limites do terreno atual —
 * numa fase futura pode vir de um clique do usuário na cena em vez de
 * aleatório, sem precisar mudar o IncidentEngine (ele só recebe a posição).
 */
export default function IncidentPanel() {
  const event = useProjectStore((s) => s.event);
  const equipments = useProjectStore((s) => s.equipments);
  const incidentSimulation = useProjectStore((s) => s.incidentSimulation);
  const startIncidentSimulation = useProjectStore((s) => s.startIncidentSimulation);
  const advanceIncidentStep = useProjectStore((s) => s.advanceIncidentStep);
  const clearIncidentSimulation = useProjectStore((s) => s.clearIncidentSimulation);

  const [scenarioType, setScenarioType] = useState(INCIDENT_SCENARIO_TYPES[0]);
  const timeoutRef = useRef(null);

  function handleStart() {
    const { width, depth } = computeGroundDimensions(event);
    const targetPosition = {
      x: (Math.random() - 0.5) * width * 0.7,
      z: (Math.random() - 0.5) * depth * 0.7,
    };
    const result = simulateIncident(scenarioType, event, equipments, targetPosition);
    startIncidentSimulation(result);
  }

  // Avança um passo por vez, com um pequeno intervalo — dá a sensação de
  // simulação acontecendo em vez de aparecer tudo de uma vez.
  useEffect(() => {
    if (!incidentSimulation) return undefined;
    if (incidentSimulation.currentStepIndex >= incidentSimulation.steps.length) return undefined;

    timeoutRef.current = setTimeout(() => {
      advanceIncidentStep();
    }, 1200);

    return () => clearTimeout(timeoutRef.current);
  }, [incidentSimulation, advanceIncidentStep]);

  const isFinished =
    incidentSimulation && incidentSimulation.currentStepIndex >= incidentSimulation.steps.length;

  return (
    <div className="absolute bottom-4 left-4 w-72 bg-ops-panel border border-ops-border rounded-lg p-4 text-white shadow-xl">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Modo Simulação</h3>

      {!incidentSimulation ? (
        <div className="mt-2 space-y-2">
          <select
            value={scenarioType}
            onChange={(e) => setScenarioType(e.target.value)}
            className="w-full bg-ops-bg border border-ops-border rounded-md px-2 py-1.5 text-sm"
          >
            {INCIDENT_SCENARIO_TYPES.map((type) => (
              <option key={type} value={type}>
                {INCIDENT_SCENARIOS[type].label}
              </option>
            ))}
          </select>
          <button
            onClick={handleStart}
            className="w-full bg-red-500/90 hover:bg-red-500 text-white text-sm font-medium py-2 rounded-md transition"
          >
            Iniciar Simulação
          </button>
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          <p className="text-sm font-medium">{incidentSimulation.scenarioLabel}</p>

          <ul className="text-xs space-y-1">
            {incidentSimulation.steps.map((step, i) => {
              const done = i < incidentSimulation.currentStepIndex;
              const active = i === incidentSimulation.currentStepIndex;
              return (
                <li
                  key={i}
                  className={
                    done
                      ? 'flex items-center gap-2 text-status-covered'
                      : active
                      ? 'flex items-center gap-2 text-ops-accent'
                      : 'flex items-center gap-2 text-gray-500'
                  }
                >
                  <span>{done ? '✓' : '○'}</span>
                  <span>{step.label}</span>
                </li>
              );
            })}
          </ul>

          {isFinished && (
            <p className="text-sm text-ops-accent border-t border-ops-border pt-2">
              Tempo estimado de resposta: {incidentSimulation.responseTimeSeconds}s
            </p>
          )}

          <button
            onClick={clearIncidentSimulation}
            className="w-full bg-ops-bg border border-ops-border text-sm py-1.5 rounded-md hover:bg-ops-border transition"
          >
            {isFinished ? 'Fechar' : 'Cancelar'}
          </button>
        </div>
      )}
    </div>
  );
}
