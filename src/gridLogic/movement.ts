import { gameBoardCellsX } from "../constants";
import { Cell, CharacterState } from "../types/gameStateTypes";
import { flatIndexToCoords } from "../utility";
import { findPath } from "./astar";

export function getPathForEnemy(
  enemy: CharacterState,
  player: CharacterState,
  walkableGrid: boolean[][],
  cells: Cell[]
) {
  const start = flatIndexToCoords(enemy.curCellIndex, gameBoardCellsX);
  const destIndex = enemy.enemyData.chooseMovementIndex(enemy, player, cells);
  const dest = flatIndexToCoords(destIndex, gameBoardCellsX);

  return findPath(walkableGrid, start, dest);
}
