import { Cell, CharacterData, GameState } from "../types/gameStateTypes";

export function cloneCharacters(state: GameState): CharacterData[] {
  return state.activeCharacters.map((char) => ({
    enemyType: char.enemyType,
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
