import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { mainAPI } from "./api/mainAPI";

const store = configureStore({
  reducer: {
    [mainAPI.reducerPath]: mainAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainAPI.middleware),
});

setupListeners(store.dispatch);

export default store;
