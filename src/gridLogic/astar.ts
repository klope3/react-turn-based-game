//g cost: distance from start position (distance from parent + parent g cost)
//h cost: distance from end node (heuristic)

import { Coordinates } from "../types/gameStateTypes";
import { NeighborCoords, PathfindingCell } from "./types";

//f cost: g cost + h cost
export function findPath(
  grid: boolean[][],
  start: Coordinates,
  end: Coordinates
): Coordinates[] | undefined {
  //initialize a new grid of pathfinding cells; these store special data like cell parents and costs
  const cellGrid = initCells(grid);

  //OPEN is a list of cells that are "in line" to be visited
  let open = [cellGrid[start.y][start.x]];
  let current = open[0];
  let endCell = cellGrid[end.y][end.x];

  while (true) {
    //get all neighbors that haven't been visited and are walkable; still include END even if it's not walkable
    const neighbors = getNeighborCells(cellGrid, current.coordinates).filter(
      (n) => n && !n.visited && (n.walkable || n === endCell)
    );
    for (const neighbor of neighbors) {
      if (!neighbor) continue;

      neighbor.hCost = distance(neighbor.coordinates, end);
      const wouldBeGCost =
        current.gCost + distance(current.coordinates, neighbor.coordinates);
      //if the neighbor cell would have a shorter path to START through CURRENT, assign CURRENT as its new parent
      if (!neighbor.parent || wouldBeGCost < neighbor.gCost) {
        neighbor.parent = current;
        neighbor.gCost = wouldBeGCost;
      }
      //put this neighbor "in line" to be visited
      addCellToOpen(open, neighbor);
    }
    //this cell will never be visited again
    removeCellFromOpen(open, current);
    current.visited = true;
    //if there are no cells in OPEN, we've run out of options and there is no path
    if (open.length === 0) break;
    //OPEN is always kept sorted, so OPEN[0] is always the cell with lowest f cost
    current = open[0];
    if (current === endCell) break;
  }

  if (current === endCell) return reconstructPath(current);
  return undefined;
}

function initCells(grid: boolean[][]): PathfindingCell[][] {
  const cells: PathfindingCell[][] = Array.from(
    { length: grid.length },
    (_) => []
  );
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      cells[y][x] = {
        coordinates: { x, y },
        parent: undefined,
        visited: false,
        walkable: grid[y][x],
        gCost: 0,
        hCost: 0,
      };
    }
  }
  return cells;
}

function distance(a: Coordinates, b: Coordinates) {
  const deltaX = Math.abs(a.x - b.x);
  const deltaY = Math.abs(a.y - b.y);
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function getNeighborCoords(
  grid: any[][],
  position: Coordinates
): NeighborCoords {
  const width = grid[0].length;
  const height = grid.length;

  return {
    left: position.x > 0 ? { x: position.x - 1, y: position.y } : undefined,
    top: position.y > 0 ? { x: position.x, y: position.y - 1 } : undefined,
    right:
      position.x < width - 1 ? { x: position.x + 1, y: position.y } : undefined,
    bottom:
      position.y < height - 1
        ? { x: position.x, y: position.y + 1 }
        : undefined,
  };
}

function getNeighborCells(
  cellGrid: PathfindingCell[][],
  centerCoords: Coordinates
) {
  const { left, top, right, bottom } = getNeighborCoords(
    cellGrid,
    centerCoords
  );
  const neighborCells = [
    left && cellGrid[left.y][left.x],
    top && cellGrid[top.y][top.x],
    right && cellGrid[right.y][right.x],
    bottom && cellGrid[bottom.y][bottom.x],
  ].filter((cell) => cell !== undefined);

  return neighborCells;
}

//backtracks through parents to build the path
function reconstructPath(endCell: PathfindingCell) {
  let current = endCell;
  let pathCells: PathfindingCell[] = [];
  while (true) {
    pathCells.push(current);
    if (!current.parent) break;
    current = current.parent;
  }
  pathCells.reverse();
  return pathCells.map((cell) => cell.coordinates);
}

//the "open" cell array has no duplicates and is always kept sorted in ascending order according to f cost
//sorting and searching through OPEN is probably a bottleneck right now, but currently performance is not an issue
function addCellToOpen(open: PathfindingCell[], cellToAdd: PathfindingCell) {
  if (open.includes(cellToAdd)) return;
  open.push(cellToAdd);
  open.sort((a, b) => a.gCost + a.hCost - (b.gCost + b.hCost));
}

function removeCellFromOpen(
  open: PathfindingCell[],
  cellToRemove: PathfindingCell
) {
  const index = open.indexOf(cellToRemove);
  open.splice(index, 1);
}
