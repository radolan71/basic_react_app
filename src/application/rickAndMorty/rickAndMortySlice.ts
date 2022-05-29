import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  Character,
  getCharactersByIds,
  getCharactersByPage,
} from "../../apis/rickAndMorty/characters";
import { RickAndMortyResponse } from "../../apis/rickAndMorty/common";
import { Episode, getEpisodes } from "../../apis/rickAndMorty/episodes";
import { getLocation, ShowLocation } from "../../apis/rickAndMorty/locations";
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

export const fetchOrigin = createAsyncThunk(
  "rickAndMorty/fetchOrigin",
  async (id: number) => {
    const origin = await getLocation(id);
    return origin;
  }
);

export const fetchEpisodes = createAsyncThunk(
  "rickAndMorty/fetchEpisodes",
  async (ids: number[]) => {
    const episodes = await getEpisodes(ids);
    return episodes;
  }
);

const createGenericExtraReducers = (
  builder: ActionReducerMapBuilder<{}>,
  thunk: AsyncThunk<any, any, any>,
  name: string
): void => {
  builder.addCase(thunk.pending, (state: any) => {
    state[name] = state[name] || {};
    state[name].requestState = RequestState.InProgress;
  });
  builder.addCase(thunk.fulfilled, (state: any, action) => {
    state[name].requestState = RequestState.Finished;
    state[name].payload = action.payload;
  });
  builder.addCase(thunk.rejected, (state: any) => {
    state[name].requestState = RequestState.Failed;
  });
};

interface RickAndMortyState {
  characters?: CustomState<RickAndMortyResponse<Character>>;
  location?: CustomState<ShowLocation>;
  episodes?: CustomState<Episode[]> & {
    characterId: number;
  };
  origin?: CustomState<ShowLocation>;
}

export const rickAndMortySlice = createSlice({
  name: "rickAndMorty",
  initialState: {} as RickAndMortyState,
  reducers: {},
  extraReducers: (builder) => {
    createGenericExtraReducers(builder, fetchCharactersByPage, "characters");
    createGenericExtraReducers(builder, fetchLocation, "location");
    createGenericExtraReducers(builder, fetchOrigin, "origin");
    createGenericExtraReducers(builder, fetchEpisodes, "episodes");
    createGenericExtraReducers(builder, fetchResidents, "residents");
  },
});
