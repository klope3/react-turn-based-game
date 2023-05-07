import { directions, gameBoardCellsX, gameBoardCellsY } from "../constants";
import { minBy } from "../minMax";
import { Cell, Coordinates } from "../types/gameStateTypes";
import {
  coordsToFlatIndex,
  flatIndexToCoords,
  getTaxicabDistance,
  getTrueDistance,
} from "../utility";
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

export function getNeighborIndices(centerIndex: number) {
  const coords = flatIndexToCoords(centerIndex, gameBoardCellsX);

  const left = coords.x > 0 ? { x: coords.x - 1, y: coords.y } : undefined;
  const top = coords.y > 0 ? { x: coords.x, y: coords.y - 1 } : undefined;
  const right =
    coords.x < gameBoardCellsX - 1
      ? { x: coords.x + 1, y: coords.y }
      : undefined;
  const bottom =
    coords.y < gameBoardCellsY - 1
      ? { x: coords.x, y: coords.y + 1 }
      : undefined;

  return {
    left: left ? coordsToFlatIndex(left, gameBoardCellsX) : undefined,
    top: top ? coordsToFlatIndex(top, gameBoardCellsX) : undefined,
    right: right ? coordsToFlatIndex(right, gameBoardCellsX) : undefined,
    bottom: bottom ? coordsToFlatIndex(bottom, gameBoardCellsX) : undefined,
  };
}

export function getOpenNeighbors(centerIndex: number, cells: Cell[]) {
  const neighbors = getNeighborIndices(centerIndex);
  const open = [
    neighbors.left,
    neighbors.top,
    neighbors.right,
    neighbors.bottom,
  ].filter((index) => {
    if (!index) return false;
    const cell = cells[index];
    return cell.characterHere === undefined && cell.cellObject === undefined;
  }) as number[]; //ts doesn't know that undefined has been filtered out
  return open;
}

export function getClosestOpenNeighbor(
  refIndex: number,
  neighborCenterIndex: number,
  cells: Cell[],
  useTrueDistance: boolean = false
) {
  const neighborIndices = getOpenNeighbors(neighborCenterIndex, cells);
  if (neighborIndices.length === 0) return refIndex;

  const distanceFunction = useTrueDistance
    ? getTrueDistance
    : getTaxicabDistance;
  const closest = minBy(neighborIndices, (index) =>
    distanceFunction(refIndex, index, gameBoardCellsX)
  ) as number; //if we reach this, we know neighborIndices has at least one value, so closest WILL be defined

  return closest;
}

export function getImportantWorldRegionIndices(
  worldCellsX: number,
  worldCellsY: number
) {
  const startingRegionCoords = {
    x: Math.floor(worldCellsX / 2),
    y: worldCellsY - 1,
  };
  const finalRegionCoords = {
    x: startingRegionCoords.x,
    y: 0,
  };
  return {
    startingRegion: coordsToFlatIndex(startingRegionCoords, worldCellsX),
    finalRegion: coordsToFlatIndex(finalRegionCoords, worldCellsX),
  };
}
