import Scene from './three/Scene/Scene.jsx';

/**
 * Entrega da Fase 0/1: uma cena 3D navegável em tela cheia.
 *
 * O que vem a seguir (não implementado ainda, de propósito):
 * - appPhase do store vai controlar quando mostrar landing/formulário
 *   por cima desta cena, em vez da cena ocupar a tela toda sempre.
 * - Painéis (menu de equipamentos, dashboard) entram na Fase 3/7 do PRD.
 */
export default function App() {
  return (
    <div className="w-screen h-screen">
      <Scene />
    </div>
  );
}
