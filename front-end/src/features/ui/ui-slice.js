import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { signupIsVisible: false },
  reducers: {
    showSignup(state) {
      state.signupIsVisible = true;
    },
    hideSignup(state) {
      state.signupIsVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
