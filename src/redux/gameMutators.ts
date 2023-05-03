import { gameBoardCellsX, godMode } from "../constants";
import { getPathForEnemy } from "../gridLogic/movement";
import { Cell, CharacterState } from "../types/gameStateTypes";
import { coordsToFlatIndex, flatIndexToCoords } from "../utility";

//! Mutators are only for use on state objects that have ALREADY been cloned!!

export function singleEnemyMoveMutator(
  newEnemy: CharacterState,
  newPlayer: CharacterState,
  walkableGrid: boolean[][],
  newCells: Cell[]
) {
  const path = getPathForEnemy(newEnemy, newPlayer, walkableGrid, newCells);
  if (!path || path.length < 2) return;

  const targetCoords = path[1];

  const start = flatIndexToCoords(newEnemy.curCellIndex, gameBoardCellsX);
  walkableGrid[start.y][start.x] = true;
  walkableGrid[targetCoords.y][targetCoords.x] = false;

  const targetIndex = coordsToFlatIndex(targetCoords, gameBoardCellsX);
  newCells[newEnemy.curCellIndex].characterHere = undefined;
  newCells[targetIndex].characterHere = newEnemy;

  newEnemy.curCellIndex = targetIndex;
}

export function attackPlayerMutator(
  newPlayer: CharacterState,
  newEnemy: CharacterState,
  walkableGrid: boolean[][]
) {
  if (!godMode) newPlayer.health--;
  const curCoords = flatIndexToCoords(newEnemy.curCellIndex, gameBoardCellsX);
  walkableGrid[curCoords.y][curCoords.x] = false;
}
