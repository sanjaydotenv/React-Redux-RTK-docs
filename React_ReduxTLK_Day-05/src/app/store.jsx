import { configureStore } from "@reduxjs/toolkit";
import authReducre from "../features/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducre,
  },
});
