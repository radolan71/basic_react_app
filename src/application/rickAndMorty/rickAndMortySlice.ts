import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Character,
  getCharacters,
  RickAndMortyResponse,
} from "../../apis/rickAndMorty/characters";
import { RequestState } from "../../helpers/requestHelper";
import { CustomState } from "../store";

export const fetchCharacters = createAsyncThunk(
  "rickAndMorty/fetchCharacters",
  async () => {
    const characters = await getCharacters();
    return characters;
  }
);
interface RickAndMortyState {
  characters?: CustomState<RickAndMortyResponse<Character>>;
}

export const rickAndMortySlice = createSlice({
  name: "rickAndMorty",
  initialState: {} as RickAndMortyState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state: any) => {
      state["characters"] = state["characters"] || {};
      state["characters"].requestState = RequestState.InProgress;
    });
    builder.addCase(fetchCharacters.fulfilled, (state: any, action) => {
      state["characters"].requestState = RequestState.Finished;
      state["characters"].payload = action.payload;
    });
    builder.addCase(fetchCharacters.rejected, (state: any) => {
      state["characters"].requestState = RequestState.Failed;
    });
  },
});
