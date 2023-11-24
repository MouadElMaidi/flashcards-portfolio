import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllCollectionsThunk } from "./allCollectionsThunk";

const initialState = {
  isLoading: false,
  collections: [],
};

export const getAllCollections = createAsyncThunk(
  "allCollections/getCollections",
  getAllCollectionsThunk,
);

const allCollectionsSlice = createSlice({
  name: "allCollections",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.pending, (state) => {
        console.log("Loading");
        state.isLoading = false;
      })
      .addCase(getAllCollections.fulfilled, (state, { payload }) => {
        console.log("Collections fetched successfully");
        state.collections = payload;
      })
      .addCase(getAllCollections.rejected, (state) => {
        console.log("There was an error!");
      });
  },
});

export const allCollectionsActions = allCollectionsSlice.actions;

export default allCollectionsSlice;
