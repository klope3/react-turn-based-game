import {
  gameBoardCellsX,
  gameBoardCellsY,
  playerHealthStart,
} from "../constants";
import { findPath } from "../gridLogic/astar";
import { getEnemyWalkableGrid } from "../gridLogic/helpers";
import {
  TOGGLE_INPUT,
  BasicAction,
  CLICK_CELL,
  ENEMY_TURN,
  MOVE_PLAYER,
} from "../types/actionTypes";
import { Cell, CharacterData, GameState } from "../types/gameStateTypes";
import {
  areCellsAdjacent,
  coordsToFlatIndex,
  flatIndexToCoords,
  getNewId,
} from "../utility";

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
    curCellIndex: 9,
    id: getNewId(),
  },
  {
    type: "enemy",
    health: 1,
    curCellIndex: 34,
    id: getNewId(),
  },
];
const initialCells: Cell[] = Array.from(
  { length: gameBoardCellsX * gameBoardCellsY },
  (_) => ({
    characterHere: undefined,
  })
);
initialCells[26].characterHere = initialCharacters[0];
initialCells[28].characterHere = initialCharacters[1];
initialCells[20].characterHere = initialCharacters[2];
initialCells[9].characterHere = initialCharacters[3];
initialCells[34].characterHere = initialCharacters[4];
const initialState: GameState = {
  activeCharacters: initialCharacters,
  selectedCellIndex: undefined,
  userInput: true,
  cells: initialCells,
};

export function gameReducer(
  state = initialState,
  action: BasicAction
): GameState {
  switch (action.type) {
    case CLICK_CELL:
      const clickedIndex = action.value;
      console.log(clickedIndex + " in reducer");
      return {
        ...state,
        selectedCellIndex: clickedIndex,
      };
    case MOVE_PLAYER:
      const player = state.activeCharacters.find(
        (char) => char.type === "player"
      );
      if (!player) return state;

      const playerIndex = state.activeCharacters.indexOf(player);
      const newCharacters = [...state.activeCharacters];
      const newPlayer = { ...player };
      newCharacters[playerIndex] = newPlayer;
      const playerPrevCellIndex = newPlayer.curCellIndex;
      const playerTargetCellIndex = action.value;

      const newCells = [...state.cells];
      const characterOccupyingTarget = newCharacters.find(
        (char) => char.curCellIndex === playerTargetCellIndex
      );
      if (characterOccupyingTarget) {
        newCharacters.splice(
          newCharacters.indexOf(characterOccupyingTarget),
          1
        );
        console.log("killed:");
        console.log(characterOccupyingTarget);
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
    case ENEMY_TURN:
      return doEnemyTurn(state);
    case TOGGLE_INPUT:
      return {
        ...state,
        userInput: !state.userInput,
      };
    default:
      return state;
  }
}

function doEnemyTurn(state: GameState): GameState {
  const player = state.activeCharacters.find((char) => char.type === "player");
  if (!player) return state;

  const newState = { ...state };
  const newCharacters = [...newState.activeCharacters];
  const newPlayer = { ...player };
  const newPlayerIndex = newCharacters.indexOf(player);
  newCharacters[newPlayerIndex] = newPlayer;
  const newCells = [...newState.cells];
  const playerCoords = flatIndexToCoords(player.curCellIndex, gameBoardCellsX);
  const walkableGrid = getEnemyWalkableGrid(state.cells);

  for (let i = 0; i < newCharacters.length; i++) {
    if (newCharacters[i].type === "player") continue;

    const enemy = newCharacters[i];
    const enemyStartCellIndex = enemy.curCellIndex;
    if (
      areCellsAdjacent(
        enemyStartCellIndex,
        player.curCellIndex,
        gameBoardCellsX
      )
    ) {
      console.log("player attacked by character:");
      console.log(enemy);
      newPlayer.health--;
      const curCoords = flatIndexToCoords(enemyStartCellIndex, gameBoardCellsX);
      walkableGrid[curCoords.y][curCoords.x] = false;
      continue;
    }
    const start = flatIndexToCoords(enemyStartCellIndex, gameBoardCellsX);
    const path = findPath(walkableGrid, start, playerCoords);
    if (!path || path.length < 2) continue;

    const firstStepCoords = path[1]; //the coords of the first path cell beyond the start cell
    const firstStepCellIndex = coordsToFlatIndex(
      firstStepCoords,
      gameBoardCellsX
    );
    const targetCoords =
      firstStepCellIndex === player.curCellIndex ? path[0] : firstStepCoords;
    walkableGrid[start.y][start.x] = true;
    walkableGrid[targetCoords.y][targetCoords.x] = false;
    const targetIndex = coordsToFlatIndex(targetCoords, gameBoardCellsX);
    const enemyNewCellIndex =
      targetIndex === player.curCellIndex ? enemyStartCellIndex : targetIndex;
    const newEnemy: CharacterData = {
      ...enemy,
      curCellIndex: enemyNewCellIndex,
    };
    newCharacters[i] = newEnemy;
    newCells[enemyStartCellIndex] = {
      ...newCells[enemyStartCellIndex],
      characterHere: undefined,
    };
    newCells[enemyNewCellIndex] = {
      ...newCells[enemyNewCellIndex],
      characterHere: newEnemy,
    };
  }
  newState.activeCharacters = newCharacters;
  newState.cells = newCells;

  return newState;
}
