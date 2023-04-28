import { displayWidth, gameBoardCellsX } from "./constants";
import { useSelector } from "react-redux/es/exports";
import { Coordinates, GameState } from "./types/gameStateTypes";

let idCounter = 0;
export function getNewId() {
  idCounter++;
  return idCounter;
}

export function cellIndexToPxOffset(cellIndex: number) {
  const coordinates = flatIndexToCoords(cellIndex, gameBoardCellsX);
  const cellSize = displayWidth / gameBoardCellsX;

  return {
    left: coordinates.x * cellSize + cellSize / 2,
    top: coordinates.y * cellSize + cellSize / 2,
  };
}

export function flatIndexToCoords(index: number, gridWidth: number) {
  return {
    x: index % gridWidth,
    y: Math.floor(index / gridWidth),
  };
}

export function coordsToFlatIndex(coords: Coordinates, gridWidth: number) {
  return coords.y * gridWidth + coords.x;
}

export function getTaxicabDistance(
  cellIndex1: number,
  cellIndex2: number,
  gridWidth: number
) {
  const { x: x1, y: y1 } = flatIndexToCoords(cellIndex1, gridWidth);
  const { x: x2, y: y2 } = flatIndexToCoords(cellIndex2, gridWidth);
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function usePlayer() {
  return useSelector((state: GameState) =>
    state.activeCharacters.find((char) => char.type === "player")
  );
}

export function areCellsAdjacent(
  cellIndex1: number,
  cellIndex2: number,
  gridWidth: number
) {
  //currently only orthogonal is considered adjacent
  return getTaxicabDistance(cellIndex1, cellIndex2, gridWidth) === 1;
}
