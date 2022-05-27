import { configureStore } from "@reduxjs/toolkit";
import { RequestState } from "../helpers/requestHelper";
import { configSlice } from "./config";
import { rickAndMortySlice } from "./rickAndMorty/rickAndMortySlice";

export const store = configureStore({
  reducer: {
    rickAndMorty: rickAndMortySlice.reducer,
    config: configSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface CustomState<T> {
  requestState: RequestState;
  payload: T;
}
