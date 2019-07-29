import GameReducer from "./GameReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  game: GameReducer
});

export default rootReducer;
