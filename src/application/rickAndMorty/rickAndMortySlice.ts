import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Character,
  getCharactersByIds,
  getCharactersByPage,
} from "../../apis/rickAndMorty/characters";
import { RickAndMortyResponse } from "../../apis/rickAndMorty/common";
import { getEpisodes } from "../../apis/rickAndMorty/episodes";
import { getLocation, Location } from "../../apis/rickAndMorty/locations";
import { RequestState } from "../../helpers/requestHelper";
import { CustomState } from "../store";

export const fetchCharactersByPage = createAsyncThunk(
  "rickAndMorty/fetchCharactersByPage",
  async (page: number) => {
    const characters = await getCharactersByPage(page);
    return characters;
  }
);

export interface ResidentsRequest {
  ids: number[];
  locationId: number;
}

export const fetchResidents = createAsyncThunk(
  "rickAndMorty/fetchResidents",
  async (residentsRequest: ResidentsRequest) => {
    const characters = await getCharactersByIds(residentsRequest.ids);
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
  residents?: CustomState<RickAndMortyResponse<Character>> & {
    locationId: number;
  };
}

export const rickAndMortySlice = createSlice({
  name: "rickAndMorty",
  initialState: {} as RickAndMortyState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharactersByPage.pending, (state: any) => {
      state["characters"] = state["characters"] || {};
      state["characters"].requestState = RequestState.InProgress;
    });
    builder.addCase(fetchCharactersByPage.fulfilled, (state: any, action) => {
      state["characters"].requestState = RequestState.Finished;
      state["characters"].payload = action.payload;
    });
    builder.addCase(fetchCharactersByPage.rejected, (state: any) => {
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

    builder.addCase(fetchResidents.pending, (state: any) => {
      state["residents"] = state["residents"] || {};
      state["residents"].requestState = RequestState.InProgress;
    });
    builder.addCase(fetchResidents.fulfilled, (state: any, action) => {
      state["residents"].requestState = RequestState.Finished;
      state["residents"].payload = action.payload;
      state["residents"].payload.locationId = action.meta.arg.locationId;
    });
    builder.addCase(fetchResidents.rejected, (state: any) => {
      state["residents"].requestState = RequestState.Failed;
    });
  },
});
