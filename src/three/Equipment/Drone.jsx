import { useProjectStore } from '../../store/useProjectStore.js';
import FieldOfView from './FieldOfView.jsx';

/**
 * Drone — cobre drone padrão e térmico (Seção 32 do PRD).
 * Fica "flutuando" na altura definida em spec.heightMeters (30m por padrão).
 */
export default function Drone({ id, position, heading, spec, selected }) {
  const setSelectedEquipmentId = useProjectStore((s) => s.setSelectedEquipmentId);

  return (
    <group
      position={[position[0], spec.heightMeters, position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedEquipmentId(id);
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial
          color={selected ? '#facc15' : '#e5e7eb'}
          emissive={selected ? '#eab308' : '#374151'}
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* braços/hélices simplificados */}
      {[
        [0.6, 0, 0.6],
        [-0.6, 0, 0.6],
        [0.6, 0, -0.6],
        [-0.6, 0, -0.6],
      ].map((offset, i) => (
        <mesh key={i} position={offset}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 12]} />
          <meshStandardMaterial color="#22d3ee" emissive="#0e7490" emissiveIntensity={0.6} />
        </mesh>
      ))}
      <FieldOfView
        range={spec.rangeMeters}
        fovDegrees={spec.fovDegrees}
        headingDegrees={heading}
        color="#a78bfa"
      />
    </group>
  );
}
