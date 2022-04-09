import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: true,
      immutableCheck: true,
    }).concat(api.middleware),
});

export { store };
