import {
  gameBoardCellsX,
  minEnemyCount,
  minSpawnDistanceFromPlayer,
  playerHealthStart,
} from "../constants";
import { characterData, getEnemyData } from "../data/characters";
import { Cell, CharacterState } from "../types/gameStateTypes";
import { getNewId, getRandomInt, getTaxicabDistance } from "../utility";
import { mulberry32 } from "./random";

export function generateCharacters(cells: Cell[], seed: number) {
  const player: CharacterState = {
    enemyData: getEnemyData("none"),
    curCellIndex: Math.floor(mulberry32(seed) * cells.length),
    health: playerHealthStart,
    id: getNewId(),
    timer: 0,
  };
  const allIndices = Array.from({ length: cells.length }, (_, i) => i);
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
      mulberry32(i + getRandomInt(seed)) * validIndices.length
    );
    const randType = chooseRandomCharacterType(seed, i + getRandomInt(seed));
    const newCharacter: CharacterState = {
      curCellIndex: validIndices[randIndex],
      health: 1,
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

function chooseRandomCharacterType(seed: number, randShift: number) {
  const typesToChooseFrom = characterData
    .filter((data) => data.type !== "none")
    .map((data) => data.type);
  const randIndex = Math.floor(
    mulberry32(seed + randShift) * typesToChooseFrom.length
  );
  return typesToChooseFrom[randIndex];
}
