import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticate: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticate = true
    },
    removeUser: (state) => {
      state.user = null
      state.isAuthenticate = false
    }
  },

});

export const { loginUser , removeUser } = AuthSlice.actions;

export default AuthSlice.reducer;
