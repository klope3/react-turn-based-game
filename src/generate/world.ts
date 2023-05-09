import { worldMapCellsX, worldMapCellsY } from "../constants";
import { WorldMapCell } from "../types/gameStateTypes";

export function generateWorldMap(): WorldMapCell[] {
  const cells: WorldMapCell[] = Array.from(
    { length: worldMapCellsX * worldMapCellsY },
    (_) => ({
      data: {
        type: "wasteland",
      },
      visited: false,
    })
  );
  return cells;
}
