import { BasicAction, CLICK_CELL } from "../types/actionTypes";
import { GameState } from "../types/gameStateTypes";

const initialState: GameState = {
  activeCharacters: [],
  selectedCellIndex: undefined,
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
    default:
      return state;
  }
}
