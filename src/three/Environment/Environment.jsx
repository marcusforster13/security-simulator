import { useMemo } from 'react';
import Ground from './Ground.jsx';
import Stage from './Stage.jsx';
import Entrance from './Entrance.jsx';
import Parking from './Parking.jsx';
import { useProjectStore } from '../../store/useProjectStore.js';
import { estimateGroundDimensions } from '../../utils/geometry.js';

/**
 * Transforma os dados brutos do formulário (event.*) em uma cena procedural.
 * Implementa a árvore descrita na Seção 15 do PRD:
 *
 * Evento
 *  ├── Área principal   -> Ground
 *  ├── Entradas (N)     -> Entrance, distribuídas no perímetro
 *  ├── Palco             -> Stage
 *  └── Estacionamento    -> Parking (condicional)
 *
 * Cada elemento é posicionado usando geometria simples (perímetro de
 * retângulo), suficiente para o MVP. Regras mais sofisticadas de
 * distribuição (evitar sobreposição com áreas críticas, por exemplo)
 * entram no PlacementEngine mais adiante — este componente só desenha
 * o que os dados básicos do evento já determinam.
 */
export default function Environment() {
  const event = useProjectStore((s) => s.event);

  const { width, depth } = useMemo(
    () => estimateGroundDimensions(event.areaSqm),
    [event.areaSqm]
  );

  // Distribui as entradas ao longo da borda "frontal" do terreno (eixo +z),
  // espaçadas uniformemente. Simples e previsível — evita entradas
  // se sobrepondo ao palco (que fica na borda oposta, -z).
  const entrancePositions = useMemo(() => {
    const count = Math.max(1, event.entrances);
    const spacing = width / (count + 1);
    return Array.from({ length: count }, (_, i) => [
      -width / 2 + spacing * (i + 1),
      0,
      depth / 2 - 5,
    ]);
  }, [event.entrances, width, depth]);

  return (
    <group>
      <Ground width={width} depth={depth} />

      <Stage position={[0, 0, -depth / 2 + 15]} />

      {entrancePositions.map((pos, i) => (
        <Entrance key={i} position={pos} label={`Entrada ${i + 1}`} />
      ))}

      {event.hasParking && (
        <Parking position={[width / 2 - 20, 0, -depth / 2 + 15]} />
      )}
    </group>
  );
}
