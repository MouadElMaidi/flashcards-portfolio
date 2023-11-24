import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import { createCollectionThunk, fetchCollectionThunk } from "./collectionThunk";

const initialState = {
  isLoading: false,
  newlyCreatedId: null,
  title: "",
  description: "",
  cards: [
    { id: nanoid(), question: "", answer: "" },
    { id: nanoid(), question: "", answer: "" },
  ],
  singleCollection: {},
};

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  createCollectionThunk,
);

export const fetchCollection = createAsyncThunk(
  "collection/fetchCollection",
  fetchCollectionThunk,
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
    clearForm: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCollection.pending, (state) => {
        console.log("Loading...");
        state.isLoading = true;
      })
      .addCase(createCollection.fulfilled, (state, { payload }) => {
        console.log("Added collection successfully");
        state.newlyCreatedId = payload;
        state.isLoading = false;
      })
      .addCase(createCollection.rejected, (state) => {
        console.log("There was an error");
        state.isLoading = false;
      })
      .addCase(fetchCollection.pending, (state) => {
        console.log("Loading collection...");
        state.isLoading = true;
      })
      .addCase(fetchCollection.fulfilled, (state, { payload }) => {
        console.log("fetched collection successfully");
        state.isLoading = false;
        state.singleCollection = payload;
      })
      .addCase(fetchCollection.rejected, (state) => {
        console.log("There was an error");
        state.isLoading = false;
      });
  },
});

export const collectionActions = collectionSlice.actions;

export default collectionSlice;
