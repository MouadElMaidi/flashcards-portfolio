import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import { createCollectionThunk } from "./collectionThunk";

const initialState = {
  isLoading: false,
  title: "",
  description: "",
  cards: [
    { id: nanoid(), question: "", answer: "" },
    { id: nanoid(), question: "", answer: "" },
  ],
};

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  createCollectionThunk,
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: initialState,
  reducers: {
    handleHeaderChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    handleCardChange: (state, { payload }) => {
      const { id, name, value } = payload;
      const cardToUpdate = state.cards.findIndex((card) => card.id === id);

      state.cards[cardToUpdate][name] = value;
    },
    addCard: (state, action) => {
      state.cards.push({
        id: nanoid(),
        question: "",
        answer: "",
      });
    },
    deleteCard: (state, { payload }) => {
      const cardToDeleteId = payload;
      state.cards = state.cards.filter((card) => card.id !== cardToDeleteId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCollection.pending, (state) => {
        console.log("Loading...");
        state.isLoading = true;
      })
      .addCase(createCollection.fulfilled, (state) => {
        console.log("Added collection successfully");
        state.isLoading = false;
      })
      .addCase(createCollection.rejected, (state) => {
        console.log("There was an error");
        state.isLoading = false;
      });
  },
});

export const collectionActions = collectionSlice.actions;

export default collectionSlice;
