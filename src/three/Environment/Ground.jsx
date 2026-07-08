/**
 * Terreno placeholder.
 *
 * Na Fase 2 (Construção do Ambiente), isto vira geração procedural real
 * a partir de event.areaSqm (definindo largura/profundidade proporcional
 * à área informada no formulário). Por agora, é um plano fixo só para
 * validar navegação e escala da cena.
 */
export default function Ground({ size = 200 }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color="#1a2332" />
    </mesh>
  );
}
