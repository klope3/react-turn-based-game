export type Action = {
  type: string;
};

export type BasicAction = Action & {
  value: number;
};

export const CLICK_CELL = "clickCell";
export const MOVE_PLAYER = "movePlayer";
export const ENEMY_TURN = "enemyTurn";
export const TOGGLE_INPUT = "toggleInput";
export const UPDATE_CELL_OBJECTS = "updateCellObjects";
export const TOGGLE_WORLD_MAP = "toggleWorldMap";
export const CLICK_WORLD_CELL = "clickWorldCell";
export const LOAD_WORLD_REGION = "loadWorldRegion";
export const LOAD_SAVE_GAME = "loadSaveGame";
export const TOGGLE_GAME_MENU = "toggleGameMenu";
export const SET_MAIN_MENU = "setMainMenu";
export const SET_GAME_OVER = "setGameOver";
