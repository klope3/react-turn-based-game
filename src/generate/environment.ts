import { gameBoardCellsX, gameBoardCellsY } from "../constants";
import { Cell } from "../types/gameStateTypes";
import { mulberry32 } from "./random";

export function generateCells(): Cell[] {
  const cells: Cell[] = Array.from(
    { length: gameBoardCellsX * gameBoardCellsY },
    (_, i) => ({
      characterHere: undefined,
      cellObject:
        mulberry32(i) < 0.1
          ? {
              type: "rock",
            }
          : undefined,
    })
  );

  return cells;
}
