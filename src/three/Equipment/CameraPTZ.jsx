import { useProjectStore } from '../../store/useProjectStore.js';
import FieldOfView from './FieldOfView.jsx';

/**
 * CameraPTZ — cobre os três tipos de câmera do menu de equipamentos
 * (Seção 32 do PRD: fixa, PTZ, térmica). O tipo específico só muda a
 * cor/spec; a representação geométrica é a mesma neste MVP (placeholder,
 * modelo GLB do Blender substitui depois sem quebrar a lógica).
 */
export default function CameraPTZ({ id, position, heading, spec, selected }) {
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
        <cylinderGeometry args={[0.12, 0.12, spec.heightMeters, 8]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      <mesh position={[0, spec.heightMeters, 0]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.8]} />
        <meshStandardMaterial
          color={selected ? '#facc15' : '#22d3ee'}
          emissive={selected ? '#eab308' : '#0e7490'}
          emissiveIntensity={0.5}
        />
      </mesh>
      <FieldOfView range={spec.rangeMeters} fovDegrees={spec.fovDegrees} headingDegrees={heading} />
    </group>
  );
}
