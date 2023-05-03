import { Cell, CharacterState, GameState } from "../types/gameStateTypes";

export function cloneCharacters(state: GameState): CharacterState[] {
  return state.activeCharacters.map((char) => ({
    enemyData: char.enemyData,
    curCellIndex: char.curCellIndex,
    health: char.health,
    id: char.id,
  }));
}

export function cloneCells(state: GameState): Cell[] {
  return state.cells.map((cell) => ({
    characterHere: cell.characterHere,
    cellObject: cell.cellObject,
  }));
}
