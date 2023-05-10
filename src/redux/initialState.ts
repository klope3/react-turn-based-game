import { worldMapCellsX, worldMapCellsY } from "../constants";
import { rebuildStateFromSave } from "../data/saveLoad";
import { generateCharacters } from "../generate/characters";
import { generateCells } from "../generate/environment";
import { getImportantWorldRegionIndices } from "../gridLogic/helpers";
import { GameState } from "../types/gameStateTypes";

export function getInitialState(): GameState {
  // TODO: player should be able to choose between random seed at start OR custom seed
  const state = getDefaultState();
  const savedString = localStorage.getItem("save");
  const saveExists = savedString !== null;
  if (!saveExists) {
    return state;
  }
  return rebuildStateFromSave(savedString);
}

export function getNewGameState(): GameState {
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
    gameMode: "play",
  };
  return initialState;
}

export function getDefaultState(): GameState {
  const state: GameState = {
    activeCharacters: [],
    selectedCellIndex: undefined,
    userInput: true,
    cells: [],
    showWorldMap: false,
    visitedWorldMapIndices: [],
    selectedWorldMapIndex: undefined,
    playerCurrentWorldIndex: 0,
    seed: 0,
    gameMode: "mainMenu",
  };
  return state;
}
