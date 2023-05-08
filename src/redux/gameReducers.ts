import {
  gameBoardCellsX,
  gameBoardCellsY,
  worldMapCellsX,
  worldMapCellsY,
} from "../constants";
import { loadStateFromSave } from "../data/saveLoad";
import { generateCharacters } from "../generate/characters";
import { generateCells } from "../generate/environment";
import {
  getEnemyWalkableGrid,
  getImportantWorldRegionIndices,
} from "../gridLogic/helpers";
import {
  BasicAction,
  CLICK_CELL,
  CLICK_WORLD_CELL,
  ENEMY_TURN,
  LOAD_SAVE_GAME,
  LOAD_WORLD_REGION,
  MOVE_PLAYER,
  TOGGLE_INPUT,
  TOGGLE_WORLD_MAP,
  UPDATE_CELL_OBJECTS,
} from "../types/actionTypes";
import { CharacterState, GameState } from "../types/gameStateTypes";
import { getNumberArray } from "../utility";
import { cloneCells, cloneCharacters } from "./cloners";
import { explosionMutator, singleEnemyMoveMutator } from "./gameMutators";
import { getInitialState } from "./initialState";

const initialState = getInitialState();

export function gameReducer(
  state = initialState,
  action: BasicAction
): GameState {
  switch (action.type) {
    case CLICK_CELL:
      return clickCellReducer(state, action);
    case MOVE_PLAYER:
      return playerTurnReducer(state, action);
    case ENEMY_TURN:
      return enemyTurnReducer(state);
    case TOGGLE_INPUT:
      return {
        ...state,
        userInput: !state.userInput,
      };
    case UPDATE_CELL_OBJECTS:
      return updateCellObjectsReducer(state);
    case TOGGLE_WORLD_MAP:
      return {
        ...state,
        showWorldMap: !state.showWorldMap,
      };
    case CLICK_WORLD_CELL:
      return clickWorldCellReducer(state, action);
    case LOAD_WORLD_REGION:
      return loadWorldRegionReducer(state, action);
    case LOAD_SAVE_GAME:
      return loadSaveGameReducer(state);
    default:
      return state;
  }
}

function clickCellReducer(state: GameState, action: BasicAction): GameState {
  const clickedIndex = action.value;
  return {
    ...state,
    selectedCellIndex: clickedIndex,
  };
}

function loadSaveGameReducer(state: GameState): GameState {
  const loadedState = loadStateFromSave();
  if (!loadedState) {
    console.log("Couldn't find any valid save data");
    return state;
  }

  return loadedState;
}

function loadWorldRegionReducer(
  state: GameState,
  action: BasicAction
): GameState {
  const regionIndex = action.value;
  const newCells = generateCells(state.seed, regionIndex);
  const newCharacters = generateCharacters(newCells, state.seed, regionIndex);
  const prevPlayer = state.activeCharacters.find(
    (char) => char.enemyData.type === "none"
  ) as CharacterState;
  const clonedPlayer = { ...prevPlayer };
  const playerToReplace = newCharacters.find(
    (char) => char.enemyData.type === "none"
  ) as CharacterState;
  clonedPlayer.curCellIndex = playerToReplace.curCellIndex;
  const playerToReplaceIndex = newCharacters.indexOf(playerToReplace);
  newCharacters[playerToReplaceIndex] = clonedPlayer;
  const newVisited = [...state.visitedWorldMapIndices, regionIndex];

  return {
    ...state,
    showWorldMap: false,
    activeCharacters: newCharacters,
    cells: newCells,
    playerCurrentWorldIndex: regionIndex,
    visitedWorldMapIndices: newVisited,
  };
}

function clickWorldCellReducer(
  state: GameState,
  action: BasicAction
): GameState {
  const clickedIndex = action.value;
  return {
    ...state,
    selectedWorldMapIndex: clickedIndex,
  };
}

function playerTurnReducer(state: GameState, action: BasicAction): GameState {
  const newCharacters = cloneCharacters(state);
  const newPlayer = newCharacters.find(
    (char) => char.enemyData.type === "none"
  );
  if (!newPlayer) return state;

  const playerPrevCellIndex = newPlayer.curCellIndex;
  const playerTargetCellIndex = action.value;

  const newCells = cloneCells(state, newCharacters);
  const characterOccupyingTarget = newCharacters.find(
    (char) => char.curCellIndex === playerTargetCellIndex
  );
  if (characterOccupyingTarget) {
    newCharacters.splice(newCharacters.indexOf(characterOccupyingTarget), 1);
  }
  const isFinalRegion =
    state.playerCurrentWorldIndex ===
    getImportantWorldRegionIndices(worldMapCellsX, worldMapCellsY).finalRegion;
  const finalVictory = newCharacters.length === 1 && isFinalRegion;
  if (finalVictory) {
    console.log("You beat the final level!");
  }

  newPlayer.curCellIndex = playerTargetCellIndex;
  newCells[playerPrevCellIndex].characterHere = undefined;
  newCells[playerTargetCellIndex].characterHere = newPlayer;

  return {
    ...state,
    activeCharacters: newCharacters,
    userInput: false,
    cells: newCells,
  };
}

function enemyTurnReducer(state: GameState): GameState {
  const newCharacters = cloneCharacters(state);
  const newPlayer = newCharacters.find(
    (char) => char.enemyData.type === "none"
  );
  if (!newPlayer) return state;

  const newCells = cloneCells(state, newCharacters);
  const walkableGrid = getEnemyWalkableGrid(state.cells);

  for (let i = 0; i < newCharacters.length; i++) {
    if (newCharacters[i].enemyData.type === "none") continue;

    const enemy = newCharacters[i];
    const { timerDirection } = enemy.enemyData;
    if (timerDirection === "decrement") {
      enemy.timer--;
      if (enemy.timer < 0) enemy.timer = 0;
    }
    if (timerDirection === "increment") {
      enemy.timer++;
    }

    if (
      enemy.enemyData.tryAttackPlayer(enemy, newPlayer, newCells, walkableGrid)
    ) {
    } else {
      singleEnemyMoveMutator(enemy, newPlayer, walkableGrid, newCells);
    }
  }

  if (newPlayer.health <= 0) {
    newCharacters.splice(newCharacters.indexOf(newPlayer), 1);
  }

  return {
    ...state,
    activeCharacters: newCharacters,
    cells: newCells,
  };
}

function updateCellObjectsReducer(state: GameState): GameState {
  const newCharacters = cloneCharacters(state);
  const newCells = cloneCells(state, newCharacters);

  const allIndices = getNumberArray(0, gameBoardCellsX * gameBoardCellsY);
  const explosionIndices = allIndices.filter((index) => {
    const objHere = newCells[index].cellObject;
    return objHere !== undefined && objHere.type === "bomb";
  });
  for (const index of explosionIndices) {
    explosionMutator(index, newCharacters, newCells);
  }

  return {
    ...state,
    activeCharacters: newCharacters,
    cells: newCells,
  };
}
