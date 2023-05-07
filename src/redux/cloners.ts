import { Cell, CharacterState, GameState } from "../types/gameStateTypes";

export function cloneCharacters(state: GameState): CharacterState[] {
  return state.activeCharacters.map((char) => ({
    enemyData: char.enemyData,
    curCellIndex: char.curCellIndex,
    health: char.health,
    healthCapacity: char.healthCapacity,
    id: char.id,
    timer: char.timer,
  }));
}

export function cloneCells(
  state: GameState,
  clonedCharacters: CharacterState[]
): Cell[] {
  return state.cells.map((cell, i) => ({
    characterHere: clonedCharacters.find((char) => char.curCellIndex === i),
    cellObject: cell.cellObject,
  }));
}
