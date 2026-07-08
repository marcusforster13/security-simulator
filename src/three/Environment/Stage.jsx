/**
 * Palco — placeholder geométrico (caixa + rampa simples).
 * Modelo GLB definitivo entra depois (pipeline Blender), sem bloquear a lógica.
 */
export default function Stage({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[20, 2, 10]} />
        <meshStandardMaterial color="#3b1f5e" />
      </mesh>
      <mesh position={[0, 4, -2]} castShadow>
        <boxGeometry args={[16, 6, 2]} />
        <meshStandardMaterial color="#2a1547" />
      </mesh>
    </group>
  );
}
