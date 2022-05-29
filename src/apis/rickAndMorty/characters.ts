import { getAppConfig } from "../../helpers/configHelper";
import { doRequest } from "../../helpers/requestHelper";
import { RickAndMortyResponse } from "./common";
import { ShowLocation } from "./locations";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Pick<ShowLocation, "name" | "url">;
  location: Pick<ShowLocation, "name" | "url">;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export enum CharacterStatusEnum {
  Alive = "Alive",
  Dead = "Dead",
}

export const getCharactersByPage = async (
  page?: number
): Promise<RickAndMortyResponse<Character>> => {
  const appConfig = getAppConfig();
  let url = `${appConfig.rickyAndMortyApi}character`;
  if (page) {
    url += `?page=${page}`;
  }
  return await doRequest("GET", url, null, { cacheKey: url });
};

export const getCharactersByIds = async (
  ids: number[]
): Promise<RickAndMortyResponse<Character>> => {
  const appConfig = getAppConfig();
  let url = `${appConfig.rickyAndMortyApi}character/${ids.join(",")}`;
  return await doRequest("GET", url, null, { cacheKey: url });
};
