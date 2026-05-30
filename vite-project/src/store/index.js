import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import cakeReducer from "./features/cakeSlice";
import userReducer from "./features/userSlice";
import { jsonPlaceholderApi } from "./features/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer,
    counter: counterReducer,
    cake: cakeReducer,
    user: userReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonPlaceholderApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
