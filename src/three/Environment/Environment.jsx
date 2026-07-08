import Ground from './Ground.jsx';
import Stage from './Stage.jsx';
import Entrance from './Entrance.jsx';
import Parking from './Parking.jsx';
import { useProjectStore } from '../../store/useProjectStore.js';
import {
  computeGroundDimensions,
  computeEntrancePositions,
  computeStagePosition,
  computeParkingPosition,
} from '../../utils/layout.js';

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
 * As posições vêm de utils/layout.js — a mesma fonte usada pelo
 * PlacementEngine, garantindo que os equipamentos sejam posicionados
 * de forma consistente com o ambiente visual.
 */
export default function Environment() {
  const event = useProjectStore((s) => s.event);

  const { width, depth } = computeGroundDimensions(event);
  const entrancePositions = computeEntrancePositions(event);
  const stagePosition = computeStagePosition(event);
  const parkingPosition = computeParkingPosition(event);

  return (
    <group>
      <Ground width={width} depth={depth} />

      <Stage position={[stagePosition.x, stagePosition.y, stagePosition.z]} />

      {entrancePositions.map((pos, i) => (
        <Entrance key={i} position={[pos.x, pos.y, pos.z]} label={`Entrada ${i + 1}`} />
      ))}

      {event.hasParking && (
        <Parking position={[parkingPosition.x, parkingPosition.y, parkingPosition.z]} />
      )}
    </group>
  );
}
