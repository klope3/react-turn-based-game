import { CLICK_CELL, MOVE_PLAYER } from "../types/actionTypes";

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
