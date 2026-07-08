/**
 * Entrada — placeholder geométrico (dois pilares + faixa no chão).
 * A quantidade e posição vêm de Environment.jsx, distribuídas ao
 * redor do perímetro do terreno com base em event.entrances.
 */
export default function Entrance({ position = [0, 0, 0], label }) {
  return (
    <group position={position}>
      <mesh position={[-2, 1.5, 0]} castShadow>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0e7490" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[2, 1.5, 0]} castShadow>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0e7490" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color="#22d3ee" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
