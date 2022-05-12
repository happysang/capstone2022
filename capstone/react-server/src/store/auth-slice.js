import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  currentState: {
    state: "success",
    message: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    checkState(state, action) {
      state.currentState = {
        state: action.payload.state,
        message: action.payload.message,
      };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
