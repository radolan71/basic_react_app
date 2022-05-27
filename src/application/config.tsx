import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConfig } from "../apis/backend";
import { setAppConfig } from "../helpers/configHelper";
import { RequestState } from "../helpers/requestHelper";

export const fetchConfig = createAsyncThunk("app/config", async () => {
  return await getConfig();
});

export const configSlice = createSlice({
  name: "config",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.pending, (state: any, action) => {
      state.requestState = RequestState.InProgress;
    });
    builder.addCase(fetchConfig.fulfilled, (state: any, action) => {
      state.payload = action.payload;
      setAppConfig(action.payload);
      state.requestState = RequestState.Finished;
    });
    builder.addCase(fetchConfig.rejected, (state: any, action) => {
      state.requestState = RequestState.Failed;
    });
  },
});
