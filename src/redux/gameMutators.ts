import { gameBoardCellsX, godMode } from "../constants";
import {
  animateExplosionAt,
  deleteElementWithSelectorAt,
} from "../dynamicObjects";
import { getNeighborIndices } from "../gridLogic/helpers";
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

export function standardAttackPlayerMutator(
  newPlayer: CharacterState,
  newEnemy: CharacterState,
  walkableGrid: boolean[][]
) {
  if (!godMode) newPlayer.health--;
  const curCoords = flatIndexToCoords(newEnemy.curCellIndex, gameBoardCellsX);
  walkableGrid[curCoords.y][curCoords.x] = false;
}

export function explosionMutator(
  explosionCellIndex: number,
  newCharacters: CharacterState[],
  newCells: Cell[]
) {
  const { left, top, right, bottom } = getNeighborIndices(explosionCellIndex);
  const neighborIndices = [left, right, top, bottom];
  for (const index of neighborIndices) {
    const charHere = newCharacters.find((char) => char.curCellIndex === index);
    if (!charHere) {
      console.log("no character at " + index);
      continue;
    }

    charHere.health--;
    console.log(
      "health of " + charHere.enemyData.type + " is now " + charHere.health
    );
    const charIndex = newCharacters.indexOf(charHere);
    if (charHere.health <= 0) {
      newCharacters.splice(charIndex, 1);
    }
  }
  newCells[explosionCellIndex].cellObject = undefined;

  const coords = flatIndexToCoords(explosionCellIndex, gameBoardCellsX);
  deleteElementWithSelectorAt(".bomb", coords);
  animateExplosionAt(explosionCellIndex);
}
