import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { RequestState } from "./RequestState";

export const createGenericExtraReducers = (
  builder: ActionReducerMapBuilder<{}>,
  thunk: AsyncThunk<any, any, any>,
  name: string
): void => {
  builder.addCase(thunk.pending, (state) => {
    state[name] = state[name] || {};
    state[name].requestState = RequestState.InProgress;
  });
  builder.addCase(thunk.fulfilled, (state, action) => {
    state[name].requestState = RequestState.Finished;
    state[name].payload = action.payload;
  });
  builder.addCase(thunk.rejected, (state) => {
    state[name].requestState = RequestState.Failed;
  });
};
