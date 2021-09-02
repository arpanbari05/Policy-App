import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware,
});
// let persistor = persistStore(store);

// export { store, persistor };
export { store };
