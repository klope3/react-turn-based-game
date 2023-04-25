import { createStore } from "redux";
import { gameReducer } from "./gameReducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(gameReducer, composeWithDevTools());
