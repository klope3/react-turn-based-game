import { generateCharacters } from "../generate/characters";
import { generateCells } from "../generate/environment";
import { GameState } from "../types/gameStateTypes";

export function getInitialState(): GameState {
  // TODO: player should be able to choose between random seed at start OR custom seed
  const seed = 0;
  const initialCells = generateCells(seed);
  const initialCharacters = generateCharacters(initialCells, seed);
  const initialState: GameState = {
    activeCharacters: initialCharacters,
    selectedCellIndex: undefined,
    userInput: true,
    cells: initialCells,
  };
  return initialState;
}
