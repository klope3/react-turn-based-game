type Action = {
  type: string;
};

export type BasicAction = Action & {
  value: number;
};

export const CLICK_CELL = "clickCell";
export const MOVE_PLAYER = "movePlayer";
export const ENEMY_TURN = "enemyTurn";
export const TOGGLE_INPUT = "toggleInput";
