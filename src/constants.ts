import { Direction } from "./gridLogic/types";

export const gameBoardCellsX = 8;
export const gameBoardCellsY = 12;
export const playerHealthStart = 3;
export const displayWidth = 320;
export const actionTimeDefault = 0.2;
export const godMode = false;
export const minSpawnDistanceFromPlayer = 4;
export const minEnemyCount = 3;
export const maxEnemyCount = 20;
export const bombThrowDelay = 3;
export const worldMapCellsX = 7;
export const worldMapCellsY = 7;
export const visitAnyWorldRegion = false;
export const directions: Direction[] = [
  "west",
  "northwest",
  "north",
  "northeast",
  "east",
  "southeast",
  "south",
  "southwest",
];
