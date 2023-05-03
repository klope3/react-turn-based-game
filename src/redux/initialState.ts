import { generateCharacters } from "../generate/characters";
import { generateCells } from "../generate/environment";
import { GameState } from "../types/gameStateTypes";

export function getInitialState(): GameState {
  const initialCells = generateCells();
  const initialCharacters = generateCharacters(initialCells);
  const initialState: GameState = {
    activeCharacters: initialCharacters,
    selectedCellIndex: undefined,
    userInput: true,
    cells: initialCells,
  };
  return initialState;
}
