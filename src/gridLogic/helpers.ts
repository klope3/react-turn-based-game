import { gameBoardCellsX, gameBoardCellsY } from "../constants";
import { Cell } from "../types/gameStateTypes";
import { flatIndexToCoords } from "../utility";

export function getEnemyWalkableGrid(cells: Cell[]): boolean[][] {
  const walkable: boolean[][] = Array.from(
    { length: gameBoardCellsY },
    (_) => []
  );
  for (let i = 0; i < cells.length; i++) {
    const coords = flatIndexToCoords(i, gameBoardCellsX);
    const characterHere = cells[i].characterHere;
    walkable[coords.y][coords.x] = characterHere === undefined;
  }
  return walkable;
}
