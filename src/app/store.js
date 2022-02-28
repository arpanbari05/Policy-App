import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: true,
      immutableCheck: true,
    }).concat(api.middleware),
});
// let persistor = persistStore(store);
// console.log("h32yg2332", store.getState());
// export { store, persistor };
export { store };
