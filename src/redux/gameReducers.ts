import { playerHealthStart } from "../constants";
import { BasicAction, CLICK_CELL, MOVE_PLAYER } from "../types/actionTypes";
import { GameState } from "../types/gameStateTypes";

const initialState: GameState = {
  activeCharacters: [
    {
      type: "player",
      health: playerHealthStart,
      curCellIndex: 26,
    },
    {
      type: "enemy",
      health: 1,
      curCellIndex: 28,
    },
  ],
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
    case MOVE_PLAYER:
      const player = state.activeCharacters.find(
        (char) => char.type === "player"
      );
      if (!player) return state;

      const playerIndex = state.activeCharacters.indexOf(player);
      const newPlayer = { ...player };
      const newCharacters = [...state.activeCharacters];
      newCharacters[playerIndex] = newPlayer;
      newPlayer.curCellIndex = action.value;
      return {
        ...state,
        activeCharacters: newCharacters,
      };
    default:
      return state;
  }
}
