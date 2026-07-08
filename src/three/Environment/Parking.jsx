/**
 * Estacionamento — placeholder geométrico (área demarcada).
 * Só é renderizado quando event.hasParking é true.
 */
export default function Parking({ position = [0, 0, 0], width = 30, depth = 20 }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#26313f" />
      </mesh>
    </group>
  );
}
