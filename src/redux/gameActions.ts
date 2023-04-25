import { CLICK_CELL } from "../types/actionTypes";

export function clickCell(clickedIndex: number) {
  return {
    type: CLICK_CELL,
    value: clickedIndex,
  };
}
