import {
  CLICK_CELL,
  CLICK_WORLD_CELL,
  ENEMY_TURN,
  LOAD_WORLD_REGION,
  MOVE_PLAYER,
  SET_GAME_OVER,
  SET_MAIN_MENU,
  START_PLAYING,
  TOGGLE_GAME_MENU,
  TOGGLE_INPUT,
  TOGGLE_WORLD_MAP,
  UPDATE_CELL_OBJECTS,
} from "../types/actionTypes";

export function clickCell(clickedIndex: number) {
  return {
    type: CLICK_CELL,
    value: clickedIndex,
  };
}

export function movePlayer(targetIndex: number) {
  return {
    type: MOVE_PLAYER,
    value: targetIndex,
  };
}

export function enemyTurn() {
  return {
    type: ENEMY_TURN,
  };
}

export function toggleInput() {
  return {
    type: TOGGLE_INPUT,
  };
}

export function updateCellObjects() {
  return {
    type: UPDATE_CELL_OBJECTS,
  };
}

export function toggleWorldMap() {
  return {
    type: TOGGLE_WORLD_MAP,
  };
}

export function clickWorldCell(clickedIndex: number) {
  return {
    type: CLICK_WORLD_CELL,
    value: clickedIndex,
  };
}

export function loadWorldRegionIndex(regionIndex: number) {
  return {
    type: LOAD_WORLD_REGION,
    value: regionIndex,
  };
}

export function toggleGameMenu() {
  return {
    type: TOGGLE_GAME_MENU,
  };
}

export function setMainMenu() {
  return {
    type: SET_MAIN_MENU,
  };
}

export function setGameOver() {
  return {
    type: SET_GAME_OVER,
  };
}

export function startPlaying() {
  return {
    type: START_PLAYING,
  };
}
