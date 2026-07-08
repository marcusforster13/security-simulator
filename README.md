# Simulador Inteligente de Segurança para Eventos — 3D

Fundação técnica do projeto (Fase 0/1 do roadmap). Cena 3D navegável, base de estado e estrutura pronta para as próximas fases.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Você deve ver um terreno com grid de referência e câmera orbital (arraste para girar, scroll para zoom).

## Decisões de arquitetura já tomadas

- **Escala:** 1 unidade three.js = 1 metro real. Todo cálculo de área/alcance depende disso.
- **Separação motor vs visual:** `src/simulation/*` é lógica pura (testável sem WebGL). `src/three/*` só renderiza o que o motor decide. Nenhum componente 3D deve conter regra de negócio.
- **Estado central:** `src/store/useProjectStore.js` (Zustand) é a única fonte de verdade. Formulário, cena 3D e dashboard leem dele; os engines escrevem nele.
- **Dados de equipamento:** `src/data/equipment/equipmentSpecs.js` é estático hoje, mas é o único lugar de onde o PlacementEngine lê specs — facilita trocar por API depois.

## Estrutura de pastas

```
src/
├── app/            # rotas e config global da aplicação (fases futuras)
├── components/
│   ├── ui/         # botões, inputs, cards genéricos
│   ├── panels/      # Dashboard, painel de indicadores (Fase 7)
│   └── forms/       # Formulário de cadastro do evento (Fase 4)
├── three/
│   ├── Scene/       # canvas, luzes, câmera — JÁ IMPLEMENTADO
│   ├── Environment/ # terreno, palco, entradas (Fase 2)
│   ├── Equipment/   # CameraPTZ, Drone, Sensor, Tower visuais (Fase 3)
│   └── Coverage/    # visualização verde/amarelo/vermelho (Fase 6)
├── simulation/
│   ├── placementEngine/  # regras de posicionamento automático (Fase 5)
│   ├── coverageEngine/   # cálculo da malha de cobertura (Fase 6)
│   ├── incidentEngine/   # cenários de ocorrência (Fase 8)
│   └── scoringEngine/    # nota final do planejamento
├── store/           # useProjectStore.js — JÁ IMPLEMENTADO
├── data/
│   ├── equipment/    # specs de câmera, drone, sensor, torre — JÁ IMPLEMENTADO
│   └── scenarios/    # templates de incidentes (Fase 8)
├── services/         # api, geração de PDF (fases futuras)
└── utils/            # geometry.js — matemática pura, JÁ IMPLEMENTADO (base)
```

## O que existe agora vs o que vem a seguir

**Existe:**
- Cena 3D navegável (terreno placeholder, grid de referência, luz, câmera orbital)
- Store central com `appPhase`, `cameraMode`, `event`, `equipments`, `coverage`
- Specs de equipamento (câmera fixa, PTZ, térmica, drones, sensor, torre)
- Funções geométricas puras (`isPointInFieldOfView`, `distance2D`) prontas para o CoverageEngine

**Próximo passo natural (Fase 2 do roadmap):**
- Substituir `Ground.jsx` por geração procedural baseada em `event.areaSqm`
- Criar palco, entradas e estacionamento como componentes em `three/Environment/`
- Formulário de cadastro do evento (`components/forms/EventSetupForm.jsx`) escrevendo no store via `setEvent`
