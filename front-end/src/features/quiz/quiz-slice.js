import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAnswerVisible: false,
  selectedResult: "skip",
  finalScore: {
    correctAnswers: 0,
    wrongAnswers: 0,
    skippedAnswers: 0,
  },
  isQuizDone: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    revealAnswer: (state) => {
      state.isAnswerVisible = true;
    },
    hideAnswer: (state) => {
      state.isAnswerVisible = false;
    },
    resetSelectedResult: (state) => {
      state.selectedResult = "skip";
    },
    handleChange: (state, { payload }) => {
      state.selectedResult = payload;
    },
    calculateScore: (state) => {
      switch (state.selectedResult) {
        case "correct":
          state.finalScore.correctAnswers++;
          break;
        case "wrong":
          state.finalScore.wrongAnswers++;
          break;
        case "skip":
          state.finalScore.skippedAnswers++;
          break;
        default:
          state.finalScore.skippedAnswers++;
          break;
      }
    },
    revealFinalScore: (state) => {
      state.isQuizDone = true;
    },
  },
});

export const quizActions = quizSlice.actions;

export default quizSlice;
