import { create } from 'zustand';

/**
 * Store central do projeto atual.
 *
 * Por que isso existe:
 * A interface (formulário, dashboard, cena 3D) e o motor de simulação
 * (PlacementEngine, CoverageEngine, IncidentEngine) precisam compartilhar
 * o mesmo estado sem se acoplar diretamente. Componentes visuais só LEEM
 * este store; os "engines" em src/simulation são os únicos que o ESCREVEM
 * a partir de cálculos (não de lógica de UI).
 *
 * appPhase   -> controla qual "tela" macro está ativa (landing, setup, building, simulator)
 * cameraMode -> controla o modo de visualização 3D ativo (overview, walk, drone, cameraView, opsCenter, cinematic)
 * event      -> dados brutos informados pelo cliente no formulário (Etapa 1 do PRD)
 * equipments -> lista de equipamentos posicionados na cena (manual ou automático)
 * coverage   -> resultado calculado pelo CoverageEngine (preenchido depois, Fase 6)
 */
export const useProjectStore = create((set) => ({
  appPhase: 'landing',
  setAppPhase: (phase) => set({ appPhase: phase }),

  cameraMode: 'overview',
  setCameraMode: (mode) => set({ cameraMode: mode }),

  event: {
    name: '',
    type: null,        // 'show' | 'festival' | 'feira' | 'corporativo' | 'estadio'
    peopleCount: 5000,
    areaSqm: 20000,
    entrances: 2,
    stages: 1,
    hasParking: true,
    vipArea: false,
    restrictedAreas: 0,
    environment: 'day', // 'day' | 'night' | 'rain'
  },
  setEvent: (partialEvent) =>
    set((state) => ({ event: { ...state.event, ...partialEvent } })),

  // Preenchido pelo PlacementEngine (automático) ou por arrastar/soltar (manual)
  equipments: [],
  setEquipments: (equipments) => set({ equipments }),
  addEquipment: (equipment) =>
    set((state) => ({ equipments: [...state.equipments, equipment] })),
  removeEquipment: (id) =>
    set((state) => ({
      equipments: state.equipments.filter((e) => e.id !== id),
    })),
  updateEquipment: (id, changes) =>
    set((state) => ({
      equipments: state.equipments.map((e) =>
        e.id === id ? { ...e, ...changes } : e
      ),
    })),

  // Preenchido pelo CoverageEngine — null até o primeiro cálculo rodar
  coverage: null,
  setCoverage: (coverage) => set({ coverage }),

  selectedEquipmentId: null,
  setSelectedEquipmentId: (id) => set({ selectedEquipmentId: id }),

  // Preenchido pelo IncidentEngine quando uma simulação de ocorrência
  // está ativa (Seção 19/35 do PRD). null = nenhuma simulação rodando.
  incidentSimulation: null,
  startIncidentSimulation: (simulation) =>
    set({ incidentSimulation: { ...simulation, currentStepIndex: 0 } }),
  advanceIncidentStep: () =>
    set((state) => {
      if (!state.incidentSimulation) return {};
      const next = Math.min(
        state.incidentSimulation.currentStepIndex + 1,
        state.incidentSimulation.steps.length
      );
      return { incidentSimulation: { ...state.incidentSimulation, currentStepIndex: next } };
    }),
  clearIncidentSimulation: () => set({ incidentSimulation: null }),
}));
