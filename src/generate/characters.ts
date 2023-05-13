import {
  gameBoardCellsX,
  maxEnemyCount,
  minEnemyCount,
  minSpawnDistanceFromPlayer,
  playerHealthStart,
  worldMapCellsX,
  worldMapCellsY,
} from "../constants";
import { characterData, getEnemyData } from "../data/characters";
import { getImportantWorldRegionIndices } from "../gridLogic/helpers";
import { Cell, CharacterState, EnemyType } from "../types/gameStateTypes";
import {
  getNewId,
  getNumberArray,
  getRandomInt,
  getTaxicabDistance,
} from "../utility";
import { mulberry32 } from "./random";

export function generateCharacters(
  cells: Cell[],
  seed: number,
  regionIndex: number
) {
  const player = createPlayer(cells, seed, regionIndex);
  const validIndices = getValidCharacterCellIndices(cells, player.curCellIndex);
  const enemyTypes = chooseEnemyTypes(seed, regionIndex);
  const enemies = createEnemies(
    cells,
    seed,
    regionIndex,
    validIndices,
    enemyTypes
  );

  return [player, ...enemies];
}

function createPlayer(cells: Cell[], seed: number, regionIndex: number) {
  const regionShift = getRandomInt(seed + regionIndex);
  const player: CharacterState = {
    enemyData: getEnemyData("none"),
    curCellIndex: Math.floor(mulberry32(regionShift) * cells.length),
    health: playerHealthStart,
    healthCapacity: playerHealthStart,
    id: getNewId(),
    timer: 0,
  };
  cells[player.curCellIndex].characterHere = player;

  return player;
}

function getValidCharacterCellIndices(cells: Cell[], playerCellIndex: number) {
  const allIndices = getNumberArray(0, cells.length);
  const validIndices = allIndices.filter((i) => {
    const objHere = cells[i].cellObject;
    const { distance: distToPlayer } = getTaxicabDistance(
      i,
      playerCellIndex,
      gameBoardCellsX
    );
    const isObstructed =
      playerCellIndex === i ||
      (objHere !== undefined && objHere.type === "rock");
    const tooClose = distToPlayer < minSpawnDistanceFromPlayer;

    return !isObstructed && !tooClose;
  });

  return validIndices;
}

function chooseEnemyTypes(seed: number, regionIndex: number): EnemyType[] {
  const typesToChooseFrom = characterData
    .filter((data) => data.type !== "none")
    .map((data) => data.type);
  const enemyCountRowDelta = (maxEnemyCount - minEnemyCount) / worldMapCellsY;
  const worldRows = getImportantWorldRegionIndices(
    worldMapCellsX,
    worldMapCellsY
  ).rows.reverse();
  const rowWithRegionIndex = worldRows.find((row) => row.includes(regionIndex));
  if (!rowWithRegionIndex) {
    console.error("Invalid region index");
    return [];
  }
  const difficulty = worldRows.indexOf(rowWithRegionIndex);
  const isFinalLevel = difficulty === worldRows.length - 1;
  const enemyCount = isFinalLevel
    ? maxEnemyCount
    : minEnemyCount + enemyCountRowDelta * difficulty;
  const countPerEnemy = Math.round(enemyCount / typesToChooseFrom.length);
  const types = typesToChooseFrom
    .map((type) => Array.from({ length: countPerEnemy }, () => type))
    .flat();
  while (types.length > maxEnemyCount) {
    types.pop();
  }
  seed = seed + 1; //this is temporary to make the build error go away

  return types;
}

function createEnemies(
  cells: Cell[],
  seed: number,
  regionIndex: number,
  validIndices: number[],
  types: EnemyType[]
) {
  const regionShift = getRandomInt(seed + regionIndex);
  const enemies = types.map((type, i) => {
    const randIndex = Math.floor(
      mulberry32(i + regionShift) * validIndices.length
    );
    const cellIndex = validIndices[randIndex];
    const newEnemy: CharacterState = {
      curCellIndex: cellIndex,
      health: 1,
      healthCapacity: 1,
      enemyData: getEnemyData(type),
      id: getNewId(),
      timer: 0,
    };
    cells[cellIndex].characterHere = newEnemy;
    validIndices.splice(randIndex, 1);
    return newEnemy;
  });

  return enemies;
}
