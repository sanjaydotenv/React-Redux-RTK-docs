import { createSlice } from "@reduxjs/toolkit";
import { hydrateUserAction, loginUserAction } from "./authAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(hydrateUserAction.pending , (state , action) => {
        state.isLoading = true
      })
      .addCase(hydrateUserAction.fulfilled , (state , action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.isLoading = false;
      })
      .addCase(hydrateUserAction.rejected , (state , action) => {
        state.isLoading = false;
      })

  },
});


export default authSlice.reducer;
