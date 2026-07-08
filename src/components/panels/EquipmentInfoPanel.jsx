import { useProjectStore } from '../../store/useProjectStore.js';
import { EQUIPMENT_SPECS } from '../../data/equipment/equipmentSpecs.js';

/**
 * Ao clicar em um equipamento na cena, este painel aparece com suas
 * informações (Seção 31 do PRD: modelo, altura, alcance, área coberta).
 * O campo `reason`, gerado pelo PlacementEngine, já antecipa o que
 * futuramente vira resposta da IA conversacional (Seção 34/21 do PRD).
 */
export default function EquipmentInfoPanel() {
  const selectedEquipmentId = useProjectStore((s) => s.selectedEquipmentId);
  const equipments = useProjectStore((s) => s.equipments);
  const setSelectedEquipmentId = useProjectStore((s) => s.setSelectedEquipmentId);

  const equipment = equipments.find((e) => e.id === selectedEquipmentId);
  if (!equipment) return null;

  const spec = EQUIPMENT_SPECS[equipment.type];
  if (!spec) return null;

  const areaCoveredSqm = Math.round(
    (Math.min(spec.fovDegrees, 360) / 360) * Math.PI * spec.rangeMeters ** 2
  );

  return (
    <div className="absolute top-4 right-4 w-72 bg-ops-panel border border-ops-border rounded-lg p-4 text-white shadow-xl">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{spec.label}</h3>
        <button
          onClick={() => setSelectedEquipmentId(null)}
          className="text-gray-400 hover:text-white leading-none"
        >
          ✕
        </button>
      </div>

      <dl className="mt-3 space-y-1 text-sm text-gray-300">
        <div className="flex justify-between">
          <dt>Altura</dt>
          <dd>{spec.heightMeters} m</dd>
        </div>
        <div className="flex justify-between">
          <dt>Alcance</dt>
          <dd>{spec.rangeMeters} m</dd>
        </div>
        <div className="flex justify-between">
          <dt>Campo de visão</dt>
          <dd>{spec.fovDegrees}°</dd>
        </div>
        <div className="flex justify-between">
          <dt>Área coberta (aprox.)</dt>
          <dd>{areaCoveredSqm.toLocaleString('pt-BR')} m²</dd>
        </div>
      </dl>

      {equipment.reason && (
        <p className="mt-3 text-xs text-ops-accent border-t border-ops-border pt-2">
          {equipment.reason}
        </p>
      )}
    </div>
  );
}
