import { worldMapCellsX, worldMapCellsY } from "../constants";
import { generateCharacters } from "../generate/characters";
import { generateCells } from "../generate/environment";
import { GameState } from "../types/gameStateTypes";
import { coordsToFlatIndex } from "../utility";

export function getInitialState(): GameState {
  // TODO: player should be able to choose between random seed at start OR custom seed
  const seed = 0;
  const playerWorldStartCoords = {
    x: Math.floor(worldMapCellsX / 2),
    y: worldMapCellsY - 1,
  };
  const playerWorldStartIndex = coordsToFlatIndex(
    playerWorldStartCoords,
    worldMapCellsX
  );
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
  };
  return initialState;
}
