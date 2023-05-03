import {
  gameBoardCellsX,
  minEnemyCount,
  minSpawnDistanceFromPlayer,
  playerHealthStart,
} from "../constants";
import { Cell, CharacterData } from "../types/gameStateTypes";
import { getNewId, getRandomInt, getTaxicabDistance } from "../utility";
import { mulberry32 } from "./random";

export function generateCharacters(cells: Cell[], seed: number) {
  const player: CharacterData = {
    curCellIndex: Math.floor(mulberry32(seed) * cells.length),
    type: "player",
    health: playerHealthStart,
    id: getNewId(),
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
    const newCharacter: CharacterData = {
      curCellIndex: validIndices[randIndex],
      health: 1,
      type: "enemy",
      id: getNewId(),
    };
    characters.push(newCharacter);
    cells[validIndices[randIndex]].characterHere = newCharacter;
    validIndices.splice(randIndex, 1);
  }

  return characters;
}
