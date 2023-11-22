import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/user/auth-slice";
import uiSlice from "./features/ui/ui-slice";
import collectionSlice from "./features/collection/collection-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    collection: collectionSlice.reducer,
  },
});

export default store;
