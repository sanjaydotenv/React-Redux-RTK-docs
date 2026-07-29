import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "Counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increase: (state, action) => {},
    decrease: (state, action) => {},
  },
});

export const { increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;
