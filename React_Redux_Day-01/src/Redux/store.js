import { combineReducers, createStore } from "redux";
import { incrementReducer } from "./Reducer/counterReducer";
import { todoReducer } from "./Reducer/todoReducer";

const rootReducer = combineReducers({
  incrementReducer,
  todoReducer,
});

export const store = createStore(rootReducer);
