import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment as DreiEnvironment } from '@react-three/drei';
import Ground from '../Environment/Ground.jsx';

/**
 * Cena 3D base do simulador.
 *
 * Escala de referência: 1 unidade three.js = 1 metro real.
 * Isso é decisão de arquitetura definida no PRD (Seção 15/18) — todo
 * cálculo de área, alcance de equipamento e cobertura depende dessa
 * convenção ser respeitada em toda a aplicação.
 *
 * Modo de câmera atual: 'overview' (orbital). Os demais modos descritos
 * no PRD (walk, drone, cameraView, opsCenter, cinematic) serão adicionados
 * como componentes de câmera alternáveis via useProjectStore.cameraMode,
 * nas fases seguintes — não implementados ainda para manter este primeiro
 * entregável simples e testável.
 */
export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [40, 40, 40], fov: 50, near: 0.1, far: 2000 }}
    >
      <color attach="background" args={['#0a0e14']} />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 80, 30]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <Ground size={200} />

      {/* Grid de referência — ajuda a validar escala (1 unidade = 1 metro) durante o desenvolvimento */}
      <Grid
        args={[200, 200]}
        cellSize={5}
        cellColor="#1f2937"
        sectionSize={25}
        sectionColor="#22d3ee"
        fadeDistance={150}
        infiniteGrid
      />

      <OrbitControls
        makeDefault
        minDistance={5}
        maxDistance={300}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}
