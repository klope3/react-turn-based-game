import { worldMapCellsX, worldMapCellsY } from "../constants";
import { loadStateFromSave } from "../data/saveLoad";
import { generateCharacters } from "../generate/characters";
import { generateCells } from "../generate/environment";
import { getImportantWorldRegionIndices } from "../gridLogic/helpers";
import { GameState } from "../types/gameStateTypes";

export function getInitialState(): GameState {
  // TODO: player should be able to choose between random seed at start OR custom seed
  const savedState = loadStateFromSave();
  if (savedState) return savedState;

  const seed = 0;
  const playerWorldStartIndex = getImportantWorldRegionIndices(
    worldMapCellsX,
    worldMapCellsY
  ).startingRegion;
  const initialCells = generateCells(seed, playerWorldStartIndex);
  const initialCharacters = generateCharacters(
    initialCells,
    seed,
    playerWorldStartIndex
  );
  const initialState: GameState = {
    activeCharacters: initialCharacters,
    selectedCellIndex: undefined,
    userInput: true,
    cells: initialCells,
    showWorldMap: false,
    visitedWorldMapIndices: [playerWorldStartIndex],
    selectedWorldMapIndex: undefined,
    playerCurrentWorldIndex: playerWorldStartIndex,
    seed,
    gameMode: "mainMenu",
  };
  return initialState;
}
