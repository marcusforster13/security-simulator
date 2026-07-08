import { useProjectStore } from '../../store/useProjectStore.js';
import FieldOfView from './FieldOfView.jsx';

/**
 * Torre de Observação — equipamento de controle (Seção 32 do PRD).
 * Alta, cobertura ampla em 360°. Serve como base/referência operacional
 * central, conforme regra do PlacementEngine.
 */
export default function Tower({ id, position, heading, spec, selected }) {
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
        <cylinderGeometry args={[0.4, 0.6, spec.heightMeters, 8]} />
        <meshStandardMaterial color={selected ? '#facc15' : '#4b5563'} />
      </mesh>
      <mesh position={[0, spec.heightMeters, 0]} castShadow>
        <boxGeometry args={[1.2, 1, 1.2]} />
        <meshStandardMaterial
          color={selected ? '#facc15' : '#22d3ee'}
          emissive={selected ? '#eab308' : '#0e7490'}
          emissiveIntensity={0.4}
        />
      </mesh>
      <FieldOfView
        range={spec.rangeMeters}
        fovDegrees={spec.fovDegrees}
        headingDegrees={heading}
        color="#22d3ee"
        opacity={0.08}
      />
    </group>
  );
}
