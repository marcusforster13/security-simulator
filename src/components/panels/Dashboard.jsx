import { useProjectStore } from '../../store/useProjectStore.js';
import { EQUIPMENT_SPECS } from '../../data/equipment/equipmentSpecs.js';

/**
 * Painel lateral de indicadores (Seção 30/34 do PRD): resumo do evento,
 * contagem de equipamentos por categoria e percentual de cobertura,
 * lendo diretamente do resultado do CoverageEngine guardado no store.
 *
 * Tempo de resposta estimado e nota operacional (ScoringEngine) ainda
 * não implementados — dependem de regras de resposta a incidentes que
 * entram junto com o IncidentEngine (próxima fase natural).
 */
export default function Dashboard() {
  const event = useProjectStore((s) => s.event);
  const equipments = useProjectStore((s) => s.equipments);
  const coverage = useProjectStore((s) => s.coverage);

  const countByCategory = equipments.reduce((acc, eq) => {
    const spec = EQUIPMENT_SPECS[eq.type];
    if (!spec) return acc;
    acc[spec.category] = (acc[spec.category] ?? 0) + 1;
    return acc;
  }, {});

  const coverageColor = !coverage
    ? '#9ca3af'
    : coverage.coveragePercent >= 80
    ? '#22c55e'
    : coverage.coveragePercent >= 50
    ? '#eab308'
    : '#ef4444';

  return (
    <div className="absolute top-4 left-4 w-64 bg-ops-panel border border-ops-border rounded-lg p-4 text-white shadow-xl space-y-4">
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Evento</h3>
        <p className="text-lg leading-tight mt-0.5">{event.name || 'Sem nome definido'}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {event.peopleCount.toLocaleString('pt-BR')} pessoas · {event.areaSqm.toLocaleString('pt-BR')} m²
        </p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Equipamentos</h3>
        <ul className="text-sm mt-1 space-y-0.5 text-gray-200">
          <li className="flex justify-between">
            <span>Monitoramento</span>
            <span>{countByCategory.monitoramento ?? 0}</span>
          </li>
          <li className="flex justify-between">
            <span>Aéreo</span>
            <span>{countByCategory.aereo ?? 0}</span>
          </li>
          <li className="flex justify-between">
            <span>Controle</span>
            <span>{countByCategory.controle ?? 0}</span>
          </li>
          <li className="flex justify-between font-medium border-t border-ops-border pt-1 mt-1">
            <span>Total</span>
            <span>{equipments.length}</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Cobertura</h3>
        {coverage ? (
          <>
            <p className="text-3xl font-semibold mt-0.5" style={{ color: coverageColor }}>
              {coverage.coveragePercent.toFixed(0)}%
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {coverage.blindSpotCount} pontos cegos de {coverage.cells.length} analisados
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500 mt-1">Calculando...</p>
        )}
      </div>
    </div>
  );
}
