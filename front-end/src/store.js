import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/user/auth-slice";
import uiSlice from "./features/ui/ui-slice";
import collectionSlice from "./features/collection/collection-slice";
import allCollectionsSlice from "./features/allCollections/allCollectionsSlice";
import quizSlice from "./features/quiz/quiz-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    collection: collectionSlice.reducer,
    allCollections: allCollectionsSlice.reducer,
    quiz: quizSlice.reducer,
  },
});

export default store;
