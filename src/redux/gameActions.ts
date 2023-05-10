import {
  TOGGLE_INPUT,
  CLICK_CELL,
  ENEMY_TURN,
  MOVE_PLAYER,
  UPDATE_CELL_OBJECTS,
  TOGGLE_WORLD_MAP,
  CLICK_WORLD_CELL,
  LOAD_WORLD_REGION,
  LOAD_SAVE_GAME,
  TOGGLE_GAME_MENU,
  SET_MAIN_MENU,
  SET_GAME_OVER,
} from "../types/actionTypes";
import { GameMode } from "../types/gameStateTypes";

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

export function loadSaveGame() {
  return {
    type: LOAD_SAVE_GAME,
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
