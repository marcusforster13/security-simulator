/**
 * Terreno procedural.
 *
 * Fase 2: o tamanho agora vem de event.areaSqm (formulário), não é mais
 * fixo. width/depth já chegam calculados por estimateGroundDimensions()
 * em utils/geometry.js, mantendo a convenção 1 unidade = 1 metro.
 */
export default function Ground({ width = 200, depth = 200 }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial color="#1a2332" />
    </mesh>
  );
}
