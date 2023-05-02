import {
  gameBoardCellsX,
  gameBoardCellsY,
  playerHealthStart,
} from "../constants";
import { generateCells } from "../generate/environment";
import { Cell, CharacterData, GameState } from "../types/gameStateTypes";
import { getNewId } from "../utility";

export function getInitialState(): GameState {
  const initialCharacters: CharacterData[] = [
    {
      type: "player",
      health: playerHealthStart,
      curCellIndex: 26,
      id: getNewId(),
    },
    {
      type: "enemy",
      health: 1,
      curCellIndex: 28,
      id: getNewId(),
    },
    {
      type: "enemy",
      health: 1,
      curCellIndex: 20,
      id: getNewId(),
    },
    {
      type: "enemy",
      health: 1,
      curCellIndex: 10,
      id: getNewId(),
    },
    {
      type: "enemy",
      health: 1,
      curCellIndex: 34,
      id: getNewId(),
    },
  ];
  const initialCells = generateCells();
  initialCells[26].characterHere = initialCharacters[0];
  initialCells[28].characterHere = initialCharacters[1];
  initialCells[20].characterHere = initialCharacters[2];
  initialCells[10].characterHere = initialCharacters[3];
  initialCells[34].characterHere = initialCharacters[4];
  const initialState: GameState = {
    activeCharacters: initialCharacters,
    selectedCellIndex: undefined,
    userInput: true,
    cells: initialCells,
  };
  return initialState;
}
