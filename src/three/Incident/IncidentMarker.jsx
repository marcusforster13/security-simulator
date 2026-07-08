import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useProjectStore } from '../../store/useProjectStore.js';

/**
 * Marcador visual do ponto onde a ocorrência simulada está acontecendo
 * (Seção 35/36 do PRD: "alerta vermelho"). Só aparece enquanto existe
 * uma incidentSimulation ativa no store.
 */
export default function IncidentMarker() {
  const incidentSimulation = useProjectStore((s) => s.incidentSimulation);
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 4) * 0.3;
    meshRef.current.scale.setScalar(pulse);
  });

  if (!incidentSimulation) return null;

  return (
    <mesh
      ref={meshRef}
      position={[incidentSimulation.targetPosition.x, 1.2, incidentSimulation.targetPosition.z]}
    >
      <sphereGeometry args={[1.2, 16, 16]} />
      <meshBasicMaterial color="#ef4444" transparent opacity={0.7} />
    </mesh>
  );
}
