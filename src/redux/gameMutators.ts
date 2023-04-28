import { gameBoardCellsX, godMode } from "../constants";
import { findPath } from "../gridLogic/astar";
import { Cell, CharacterData, Coordinates } from "../types/gameStateTypes";
import { coordsToFlatIndex, flatIndexToCoords } from "../utility";

//! Mutators are only for use on state objects that have ALREADY been cloned!!

export function singleEnemyMoveMutator(
  newEnemy: CharacterData,
  playerCoords: Coordinates,
  walkableGrid: boolean[][],
  newCells: Cell[]
) {
  const start = flatIndexToCoords(newEnemy.curCellIndex, gameBoardCellsX);
  const path = findPath(walkableGrid, start, playerCoords);
  if (!path || path.length < 2) return;

  const targetCoords = path[1];

  walkableGrid[start.y][start.x] = true;
  walkableGrid[targetCoords.y][targetCoords.x] = false;

  const targetIndex = coordsToFlatIndex(targetCoords, gameBoardCellsX);
  newCells[newEnemy.curCellIndex].characterHere = undefined;
  newCells[targetIndex].characterHere = newEnemy;

  newEnemy.curCellIndex = targetIndex;
}

export function attackPlayerMutator(
  newPlayer: CharacterData,
  newEnemy: CharacterData,
  walkableGrid: boolean[][]
) {
  if (!godMode) newPlayer.health--;
  const curCoords = flatIndexToCoords(newEnemy.curCellIndex, gameBoardCellsX);
  walkableGrid[curCoords.y][curCoords.x] = false;
}
