import { gameBoardCellsX } from "../constants";
import { CharacterData } from "../types/gameStateTypes";
import { flatIndexToCoords } from "../utility";
import { findPath } from "./astar";

export function getPathForEnemy(
  enemy: CharacterData,
  player: CharacterData,
  walkableGrid: boolean[][]
) {
  const start = flatIndexToCoords(enemy.curCellIndex, gameBoardCellsX);
  const playerCoords = flatIndexToCoords(player.curCellIndex, gameBoardCellsX);

  return findPath(walkableGrid, start, playerCoords);
}
