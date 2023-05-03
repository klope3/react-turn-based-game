import { Coordinates } from "../types/gameStateTypes";

export type NeighborCoords = {
  left: Coordinates | undefined;
  top: Coordinates | undefined;
  right: Coordinates | undefined;
  bottom: Coordinates | undefined;
};

export type PathfindingCell = {
  coordinates: Coordinates;
  parent: PathfindingCell | undefined;
  visited: boolean;
  walkable: boolean;
  gCost: number;
  hCost: number;
};

export type Direction =
  | "west"
  | "northwest"
  | "north"
  | "northeast"
  | "east"
  | "southeast"
  | "south"
  | "southwest";
