import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/user/auth-slice";
import uiSlice from "./features/ui/ui-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, ui: uiSlice.reducer },
});

export default store;
