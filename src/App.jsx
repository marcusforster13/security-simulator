import Scene from './three/Scene/Scene.jsx';
import EventSetupForm from './components/forms/EventSetupForm.jsx';
import EquipmentInfoPanel from './components/panels/EquipmentInfoPanel.jsx';
import Dashboard from './components/panels/Dashboard.jsx';
import IncidentPanel from './components/panels/IncidentPanel.jsx';
import { useProjectStore } from './store/useProjectStore.js';

/**
 * Máquina de estados simples de "telas" macro da aplicação, controlada
 * por appPhase (Seções 27-30 do PRD: Landing -> Setup -> Building -> Simulator).
 *
 * Ainda não implementados de propósito (próximas fases):
 * - 'landing': tela de apresentação cinematográfica (Seção 27)
 * - 'building': animação de construção do cenário (Seção 29)
 * Por ora, o fluxo pula direto para 'setup' -> 'simulator'.
 */
export default function App() {
  const appPhase = useProjectStore((s) => s.appPhase);

  if (appPhase === 'simulator') {
    return (
      <div className="w-screen h-screen relative">
        <Scene />
        <Dashboard />
        <IncidentPanel />
        <EquipmentInfoPanel />
      </div>
    );
  }

  // 'landing' e 'setup' caem aqui por enquanto — landing cinematográfica
  // ainda não implementada, então já mostramos o formulário direto.
  return <EventSetupForm />;
}
