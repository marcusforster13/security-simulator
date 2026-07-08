import { Instances, Instance } from '@react-three/drei';

const STATUS_COLORS = {
  covered: '#22c55e', // verde — monitorado com redundância
  partial: '#eab308', // amarelo — cobertura parcial
  blind: '#ef4444', // vermelho — ponto cego
};

/**
 * Renderiza o resultado do CoverageEngine como um tapete de quadrados
 * coloridos sobre o terreno. Usa <Instances> (instancing) em vez de um
 * <mesh> por célula — com centenas de células, um mesh individual por
 * célula gerava draw calls demais; instancing resolve isso num único
 * draw call para todas as células do mesmo material.
 */
export default function CoverageOverlay({ coverage }) {
  if (!coverage) return null;

  const { cells, cellSize } = coverage;
  const size = cellSize * 0.85; // pequena margem entre células, só estético

  return (
    <Instances limit={cells.length} range={cells.length}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial transparent opacity={0.35} depthWrite={false} toneMapped={false} />
      {cells.map((cell, i) => (
        <Instance
          key={i}
          position={[cell.x, 0.03, cell.z]}
          rotation={[-Math.PI / 2, 0, 0]}
          color={STATUS_COLORS[cell.status]}
        />
      ))}
    </Instances>
  );
}
