import { useProjectStore } from '../../store/useProjectStore.js';
import FieldOfView from './FieldOfView.jsx';

/**
 * Sensor — equipamento de controle (Seção 32 do PRD). Baixo ao chão,
 * cobertura curta e em 360°, conforme spec em equipmentSpecs.js.
 */
export default function Sensor({ id, position, heading, spec, selected }) {
  const setSelectedEquipmentId = useProjectStore((s) => s.setSelectedEquipmentId);

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedEquipmentId(id);
      }}
    >
      <mesh position={[0, spec.heightMeters / 2, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, spec.heightMeters, 12]} />
        <meshStandardMaterial
          color={selected ? '#facc15' : '#f97316'}
          emissive={selected ? '#eab308' : '#9a3412'}
          emissiveIntensity={0.5}
        />
      </mesh>
      <FieldOfView
        range={spec.rangeMeters}
        fovDegrees={spec.fovDegrees}
        headingDegrees={heading}
        color="#f97316"
        opacity={0.12}
      />
    </group>
  );
}
