import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUser: localStorage.getItem("loggedInUser") || null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginUser = action.payload;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.loginUser = null;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { login , logout } = loginSlice.actions;

export default loginSlice.reducer;
