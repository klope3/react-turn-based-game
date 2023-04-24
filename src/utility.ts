import { displayWidth, gameBoardCellsX } from "./constants";
import { Coordinates } from "./types/gameStateTypes";

export function boardCoordsToPxOffset(coordinates: Coordinates) {
  const cellSize = displayWidth / gameBoardCellsX;

  return {
    left: coordinates.x * cellSize + cellSize / 2,
    top: coordinates.y * cellSize + cellSize / 2,
  };
}
