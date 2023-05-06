import {
  TOGGLE_INPUT,
  CLICK_CELL,
  ENEMY_TURN,
  MOVE_PLAYER,
  UPDATE_CELL_OBJECTS,
  TOGGLE_WORLD_MAP,
  CLICK_WORLD_CELL,
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
