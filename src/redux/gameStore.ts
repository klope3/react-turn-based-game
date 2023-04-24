import { createStore } from "redux";
import { gameReducer } from "./gameReducers";

export const store = createStore(gameReducer);
