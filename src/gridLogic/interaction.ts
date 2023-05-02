import { gameBoardCellsX } from "../constants";
import { CharacterData } from "../types/gameStateTypes";
import { areCellsAdjacent } from "../utility";

export function canEnemyAttackPlayer(
  enemy: CharacterData,
  player: CharacterData
) {
  return areCellsAdjacent(
    enemy.curCellIndex,
    player.curCellIndex,
    gameBoardCellsX
  );
}
