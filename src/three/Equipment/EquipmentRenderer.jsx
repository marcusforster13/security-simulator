import { useProjectStore } from '../../store/useProjectStore.js';
import { EQUIPMENT_SPECS } from '../../data/equipment/equipmentSpecs.js';
import CameraPTZ from './CameraPTZ.jsx';
import Drone from './Drone.jsx';
import Sensor from './Sensor.jsx';
import Tower from './Tower.jsx';

const CAMERA_TYPES = ['camera_fixed', 'camera_ptz', 'camera_thermal'];
const DRONE_TYPES = ['drone_standard', 'drone_thermal'];

/**
 * Lê a lista de equipamentos do store (gerada pelo PlacementEngine ou,
 * futuramente, por arrastar/soltar manual) e decide qual componente
 * visual renderizar para cada um, com base em EQUIPMENT_SPECS.
 *
 * Este componente não sabe POR QUE um equipamento está ali — só desenha
 * o que o motor decidiu. Mantém a separação motor/visual da arquitetura.
 */
export default function EquipmentRenderer() {
  const equipments = useProjectStore((s) => s.equipments);
  const selectedEquipmentId = useProjectStore((s) => s.selectedEquipmentId);

  return (
    <>
      {equipments.map((eq) => {
        const spec = EQUIPMENT_SPECS[eq.type];
        if (!spec) return null;

        const commonProps = {
          id: eq.id,
          position: [eq.position.x, eq.position.y, eq.position.z],
          heading: eq.heading ?? 0,
          spec,
          selected: eq.id === selectedEquipmentId,
        };

        if (CAMERA_TYPES.includes(eq.type)) return <CameraPTZ key={eq.id} {...commonProps} />;
        if (DRONE_TYPES.includes(eq.type)) return <Drone key={eq.id} {...commonProps} />;
        if (eq.type === 'sensor') return <Sensor key={eq.id} {...commonProps} />;
        if (eq.type === 'tower') return <Tower key={eq.id} {...commonProps} />;
        return null;
      })}
    </>
  );
}
