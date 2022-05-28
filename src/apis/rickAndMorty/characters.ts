import { getAppConfig } from "../../helpers/configHelper";
import { doRequest } from "../../helpers/requestHelper";
import { RickAndMortyResponse } from "./common";
import { Location } from "./locations";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Pick<Location, "name" | "url">;
  location: Pick<Location, "name" | "url">;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const getCharactersByPage = async (
  page?: number
): Promise<RickAndMortyResponse<Character>> => {
  const appConfig = getAppConfig();
  let url = `${appConfig.rickyAndMortyApi}character`;
  let cacheKey = "";
  if (page) {
    cacheKey = `?page=${page}`;
    url += cacheKey;
  }
  return await doRequest("GET", url, null, { cacheKey: cacheKey });
};

export const getCharactersByIds = async (
  ids: number[]
): Promise<RickAndMortyResponse<Character>> => {
  const appConfig = getAppConfig();
  let url = `${appConfig.rickyAndMortyApi}character/${ids.join(",")}`;
  let cacheKey = "url";
  return await doRequest("GET", url, null, { cacheKey: cacheKey });
};
