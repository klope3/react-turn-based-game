import { directions, gameBoardCellsX, gameBoardCellsY } from "../constants";
import { Cell, Coordinates } from "../types/gameStateTypes";
import { coordsToFlatIndex, flatIndexToCoords } from "../utility";
import { Direction } from "./types";

export function getEnemyWalkableGrid(cells: Cell[]): boolean[][] {
  const walkable: boolean[][] = Array.from(
    { length: gameBoardCellsY },
    (_) => []
  );
  for (let i = 0; i < cells.length; i++) {
    const coords = flatIndexToCoords(i, gameBoardCellsX);
    const characterHere = cells[i].characterHere;
    const objHere = cells[i].cellObject;
    walkable[coords.y][coords.x] =
      characterHere === undefined && (!objHere || objHere.type !== "rock");
  }
  return walkable;
}

export function getLineOfCells(
  cells: Cell[],
  direction: Direction,
  startIndex: number,
  length: number,
  blockingCb?: (cell: Cell) => boolean
): Cell[] {
  const deltas = getDeltasForDirection(direction);
  let curCoords = flatIndexToCoords(startIndex, gameBoardCellsX);
  const line: Cell[] = [];

  while (true) {
    curCoords.x += deltas.x;
    curCoords.y += deltas.y;
    if (!coordsInBounds(curCoords)) break;

    const index = coordsToFlatIndex(curCoords, gameBoardCellsX);
    if (blockingCb && blockingCb(cells[index])) break;

    line.push(cells[index]);
    if (line.length === length) break;
  }

  return line;
}

export function getLinesOfSightFlat(
  cells: Cell[],
  startIndex: number,
  length: number,
  blockingCb?: (cell: Cell) => boolean
) {
  const los = getLinesOfSight(cells, startIndex, length, blockingCb);
  return [
    ...los.west,
    ...los.northwest,
    ...los.north,
    ...los.northeast,
    ...los.east,
    ...los.southeast,
    ...los.south,
    ...los.southwest,
  ];
}

export function getLinesOfSight(
  cells: Cell[],
  startIndex: number,
  length: number,
  blockingCb?: (cell: Cell) => boolean
) {
  const linesOfSight = directions.map((direction) =>
    getLineOfCells(cells, direction, startIndex, length, blockingCb)
  );
  return {
    west: linesOfSight[0],
    northwest: linesOfSight[1],
    north: linesOfSight[2],
    northeast: linesOfSight[3],
    east: linesOfSight[4],
    southeast: linesOfSight[5],
    south: linesOfSight[6],
    southwest: linesOfSight[7],
  };
}

function coordsInBounds(coordinates: Coordinates) {
  return (
    coordinates.x >= 0 &&
    coordinates.x < gameBoardCellsX &&
    coordinates.y >= 0 &&
    coordinates.y < gameBoardCellsY
  );
}

function getDeltasForDirection(direction: Direction) {
  let deltas = {
    x: 0,
    y: 0,
  };
  if (direction.includes("east")) deltas.x = 1;
  if (direction.includes("west")) deltas.x = -1;
  if (direction.includes("north")) deltas.y = -1;
  if (direction.includes("south")) deltas.y = 1;

  return deltas;
}
