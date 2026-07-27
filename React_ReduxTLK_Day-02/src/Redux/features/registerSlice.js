import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  RegisteredUsers: JSON.parse(localStorage.getItem("registerUsers")) || [],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    userRegister: (state, action) => {
      const data = action.payload;
      localStorage.setItem("registerUsers",JSON.stringify([...state.RegisteredUsers, data]),
      );
      state.RegisteredUsers.push(data);
    },
  },
});

export const { userRegister } = registerSlice.actions;

export default registerSlice.reducer;
