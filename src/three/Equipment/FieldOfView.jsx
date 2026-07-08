import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Representa visualmente o campo de visão (FOV) de um equipamento como
 * um setor circular ("leque") projetado no chão — versão simplificada
 * para o MVP. O CoverageEngine (Fase 6) vai substituir/complementar isso
 * por uma malha de pontos verde/amarelo/vermelho real (Seção 18 do PRD);
 * este componente é só a indicação visual individual de cada equipamento.
 *
 * headingDegrees segue a mesma convenção de utils/geometry.js (0° = eixo +z).
 */
export default function FieldOfView({
  range,
  fovDegrees,
  headingDegrees = 0,
  color = '#22d3ee',
  opacity = 0.16,
}) {
  const geometry = useMemo(() => {
    const fovRad = THREE.MathUtils.degToRad(Math.min(fovDegrees, 360));
    const thetaStart = -fovRad / 2;
    return new THREE.CircleGeometry(range, 32, thetaStart, fovRad);
  }, [range, fovDegrees]);

  // Offset de 90° para alinhar o eixo local do CircleGeometry (padrão +x)
  // com a convenção de heading do projeto (0° = +z).
  const groupRotationY = THREE.MathUtils.degToRad(headingDegrees) + Math.PI / 2;

  return (
    <group rotation={[0, groupRotationY, 0]}>
      <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
