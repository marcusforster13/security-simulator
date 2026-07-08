import { useState } from 'react';
import { useProjectStore } from '../../store/useProjectStore.js';

const EVENT_TYPES = [
  { value: 'show', label: 'Show' },
  { value: 'festival', label: 'Festival' },
  { value: 'feira', label: 'Feira' },
  { value: 'corporativo', label: 'Evento corporativo' },
  { value: 'estadio', label: 'Estádio' },
];

const ENVIRONMENTS = [
  { value: 'day', label: 'Dia' },
  { value: 'night', label: 'Noite' },
  { value: 'rain', label: 'Chuva' },
];

/**
 * Tela de Configuração do Evento (Seção 28 do PRD).
 * Escreve diretamente no store via setEvent — não guarda estado próprio
 * de "evento", só o que é puramente local ao formulário (se necessário).
 * Ao confirmar, muda appPhase para 'building' (a Tela de Construção
 * Automática, Seção 29, entra na próxima etapa do desenvolvimento).
 */
export default function EventSetupForm() {
  const event = useProjectStore((s) => s.event);
  const setEvent = useProjectStore((s) => s.setEvent);
  const setAppPhase = useProjectStore((s) => s.setAppPhase);

  const [localName, setLocalName] = useState(event.name);

  function handleSubmit(e) {
    e.preventDefault();
    setEvent({ name: localName });
    setAppPhase('simulator'); // Tela de Construção Automática entra depois; por ora vai direto pro simulador
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-ops-bg">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-ops-panel border border-ops-border rounded-xl p-8 space-y-6"
      >
        <div>
          <h1 className="text-2xl font-semibold text-white">Configuração do Evento</h1>
          <p className="text-sm text-gray-400 mt-1">
            Informe os dados do evento para gerar o ambiente 3D e o planejamento de segurança.
          </p>
        </div>

        {/* Informações básicas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-sm text-gray-300">Nome do evento</label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="Ex: Show de encerramento"
              className="mt-1 w-full bg-ops-bg border border-ops-border rounded-md px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Tipo de evento</label>
            <select
              value={event.type ?? ''}
              onChange={(e) => setEvent({ type: e.target.value })}
              className="mt-1 w-full bg-ops-bg border border-ops-border rounded-md px-3 py-2 text-white"
            >
              <option value="" disabled>Selecione</option>
              {EVENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">Ambiente</label>
            <select
              value={event.environment}
              onChange={(e) => setEvent({ environment: e.target.value })}
              className="mt-1 w-full bg-ops-bg border border-ops-border rounded-md px-3 py-2 text-white"
            >
              {ENVIRONMENTS.map((env) => (
                <option key={env.value} value={env.value}>{env.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tamanho do evento */}
        <div>
          <label className="text-sm text-gray-300">
            Quantidade de pessoas: <span className="text-ops-accent font-medium">{event.peopleCount.toLocaleString('pt-BR')}</span>
          </label>
          <input
            type="range"
            min={500}
            max={50000}
            step={500}
            value={event.peopleCount}
            onChange={(e) => setEvent({ peopleCount: Number(e.target.value) })}
            className="mt-2 w-full accent-ops-accent"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Área aproximada (m²)</label>
          <input
            type="number"
            min={1000}
            step={1000}
            value={event.areaSqm}
            onChange={(e) => setEvent({ areaSqm: Number(e.target.value) })}
            className="mt-1 w-full bg-ops-bg border border-ops-border rounded-md px-3 py-2 text-white"
          />
        </div>

        {/* Estrutura */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-300">Entradas</label>
            <input
              type="number"
              min={1}
              value={event.entrances}
              onChange={(e) => setEvent({ entrances: Number(e.target.value) })}
              className="mt-1 w-full bg-ops-bg border border-ops-border rounded-md px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Palcos</label>
            <input
              type="number"
              min={0}
              value={event.stages}
              onChange={(e) => setEvent({ stages: Number(e.target.value) })}
              className="mt-1 w-full bg-ops-bg border border-ops-border rounded-md px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Áreas restritas</label>
            <input
              type="number"
              min={0}
              value={event.restrictedAreas}
              onChange={(e) => setEvent({ restrictedAreas: Number(e.target.value) })}
              className="mt-1 w-full bg-ops-bg border border-ops-border rounded-md px-3 py-2 text-white"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={event.hasParking}
              onChange={(e) => setEvent({ hasParking: e.target.checked })}
              className="accent-ops-accent"
            />
            Estacionamento
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={event.vipArea}
              onChange={(e) => setEvent({ vipArea: e.target.checked })}
              className="accent-ops-accent"
            />
            Área VIP
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-ops-accent text-ops-bg font-semibold py-3 rounded-md hover:opacity-90 transition"
        >
          Gerar Ambiente 3D
        </button>
      </form>
    </div>
  );
}
