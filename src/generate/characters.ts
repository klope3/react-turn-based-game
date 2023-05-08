import {
  gameBoardCellsX,
  minEnemyCount,
  minSpawnDistanceFromPlayer,
  playerHealthStart,
} from "../constants";
import { characterData, getEnemyData } from "../data/characters";
import { Cell, CharacterState } from "../types/gameStateTypes";
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
  const allIndices = getNumberArray(0, cells.length);
  const validIndices = allIndices.filter((i) => {
    const objHere = cells[i].cellObject;
    const { distance: distToPlayer } = getTaxicabDistance(
      i,
      player.curCellIndex,
      gameBoardCellsX
    );
    const isObstructed =
      player.curCellIndex === i ||
      (objHere !== undefined && objHere.type === "rock");
    const tooClose = distToPlayer < minSpawnDistanceFromPlayer;

    return !isObstructed && !tooClose;
  });

  const characters = [player];
  for (let i = 0; i < minEnemyCount && validIndices.length > 0; i++) {
    const randIndex = Math.floor(
      mulberry32(i + regionShift) * validIndices.length
    );
    const randType = chooseRandomCharacterType(seed, i, regionIndex);
    const newCharacter: CharacterState = {
      curCellIndex: validIndices[randIndex],
      health: 1,
      healthCapacity: 1,
      enemyData: getEnemyData(randType),
      id: getNewId(),
      timer: 0,
    };
    characters.push(newCharacter);
    cells[validIndices[randIndex]].characterHere = newCharacter;
    validIndices.splice(randIndex, 1);
  }

  return characters;
}

function chooseRandomCharacterType(
  seed: number,
  cellIndex: number,
  regionIndex: number
) {
  const regionShift = getRandomInt(seed + regionIndex);
  const typesToChooseFrom = characterData
    .filter((data) => data.type !== "none")
    .map((data) => data.type);
  const randIndex = Math.floor(
    mulberry32(cellIndex + regionShift) * typesToChooseFrom.length
  );
  return typesToChooseFrom[randIndex];
}
