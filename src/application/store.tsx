import { configureStore } from "@reduxjs/toolkit";
import { rickAndMortySlice } from "./rickAndMorty/rickAndMortySlice";

export const store = configureStore({
  reducer: {
    rickAndMorty: rickAndMortySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
