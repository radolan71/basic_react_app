import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Character, getCharacters } from "../../apis/rickAndMorty/characters";
import { RickAndMortyResponse } from "../../apis/rickAndMorty/common";
import { getEpisodes } from "../../apis/rickAndMorty/episodes";
import { getLocation, Location } from "../../apis/rickAndMorty/locations";
import { RequestState } from "../../helpers/requestHelper";
import { CustomState } from "../store";

export const fetchCharacters = createAsyncThunk(
  "rickAndMorty/fetchCharacters",
  async (page: number) => {
    const characters = await getCharacters(page);
    return characters;
  }
);

export const fetchLocation = createAsyncThunk(
  "rickAndMorty/fetchLocation",
  async (id: number) => {
    const location = await getLocation(id);
    return location;
  }
);

export const fetchEpisodes = createAsyncThunk(
  "rickAndMorty/fetchEpisodes",
  async (ids: number[]) => {
    const episodes = await getEpisodes(ids);
    return episodes;
  }
);

interface RickAndMortyState {
  characters?: CustomState<RickAndMortyResponse<Character>>;
  location?: CustomState<Location>;
  episodes?: CustomState<Record<any, any>>;
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

    builder.addCase(fetchLocation.pending, (state: any) => {
      state["location"] = state["location"] || {};
      state["location"].requestState = RequestState.InProgress;
    });
    builder.addCase(fetchLocation.fulfilled, (state: any, action) => {
      state["location"].requestState = RequestState.Finished;
      state["location"].payload = action.payload;
    });
    builder.addCase(fetchLocation.rejected, (state: any) => {
      state["location"].requestState = RequestState.Failed;
    });

    builder.addCase(fetchEpisodes.pending, (state: any) => {
      state["episodes"] = state["episodes"] || {};
      state["episodes"].requestState = RequestState.InProgress;
    });
    builder.addCase(fetchEpisodes.fulfilled, (state: any, action) => {
      state["episodes"].requestState = RequestState.Finished;
      state["episodes"].payload = action.payload;
    });
    builder.addCase(fetchEpisodes.rejected, (state: any) => {
      state["episodes"].requestState = RequestState.Failed;
    });
  },
});
