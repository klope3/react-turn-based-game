import { gameBoardCellsX, gameBoardCellsY } from "../constants";
import { getCellObjectData } from "../data/cellObjects";
import { Cell } from "../types/gameStateTypes";
import { getRandomInt } from "../utility";
import { mulberry32 } from "./random";

export function generateCells(seed: number): Cell[] {
  const cells: Cell[] = Array.from(
    { length: gameBoardCellsX * gameBoardCellsY },
    (_, i) => ({
      characterHere: undefined,
      cellObject:
        mulberry32(i + getRandomInt(seed)) < 0.1
          ? getCellObjectData("rock")
          : undefined,
    })
  );

  return cells;
}
