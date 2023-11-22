import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserThunk, registerUserThunk } from "./auth-thunk";

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkApi) => {
    return registerUserThunk("/auth/signup", user, thunkApi);
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkApi) => {
    return loginUserThunk("/auth/login", user, thunkApi);
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: getUserFromLocalStorage(),
  },
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
