import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";
import registerReducer from "./features/registerSlice";
import productReducer from "./features/createProductSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    productReducer,
    cartReducer,
  },
});
