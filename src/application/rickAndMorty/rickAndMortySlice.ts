import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCharacters } from "../../apis/rickAndMorty/characters";
import { createGenericExtraReducers } from "../../helpers/createGenericExtraReducers";

export const fetchCharacters = createAsyncThunk(
  "rickAndMorty/fetchCharacters",
  async () => {
    const characters = await getCharacters();
    return characters;
  }
);

export const rickAndMortySlice = createSlice({
  name: "rickAndMorty",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    createGenericExtraReducers(builder, fetchCharacters, "characters");
  },
});
