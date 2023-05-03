import { getEnemyWalkableGrid } from "../gridLogic/helpers";
import {
  BasicAction,
  CLICK_CELL,
  ENEMY_TURN,
  MOVE_PLAYER,
  TOGGLE_INPUT,
} from "../types/actionTypes";
import { GameState } from "../types/gameStateTypes";
import { cloneCells, cloneCharacters } from "./cloners";
import { attackPlayerMutator, singleEnemyMoveMutator } from "./gameMutators";
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

function playerTurnReducer(state: GameState, action: BasicAction): GameState {
  const newCharacters = cloneCharacters(state);
  const newPlayer = newCharacters.find(
    (char) => char.enemyData.type === "none"
  );
  if (!newPlayer) return state;

  const playerPrevCellIndex = newPlayer.curCellIndex;
  const playerTargetCellIndex = action.value;

  const newCells = cloneCells(state);
  const characterOccupyingTarget = newCharacters.find(
    (char) => char.curCellIndex === playerTargetCellIndex
  );
  if (characterOccupyingTarget) {
    newCharacters.splice(newCharacters.indexOf(characterOccupyingTarget), 1);
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

  const newCells = cloneCells(state);
  const walkableGrid = getEnemyWalkableGrid(state.cells);

  for (let i = 0; i < newCharacters.length; i++) {
    if (newCharacters[i].enemyData.type === "none") continue;

    const enemy = newCharacters[i];

    if (enemy.enemyData.canAttackPlayer(enemy, newPlayer, newCells)) {
      attackPlayerMutator(newPlayer, enemy, walkableGrid);
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
