import { getAppConfig } from "../../helpers/configHelper";
import { doRequest } from "../../helpers/requestHelper";
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

export const getCharacters = async (page?: number): Promise<any> => {
  const appConfig = getAppConfig();
  let url = `${appConfig.rickyAndMortyApi}character`;
  let cacheKey = "";
  if (page) {
    cacheKey = `?page=${page}`;
    url += cacheKey;
  }
  return await doRequest("GET", url, null, { cacheKey: cacheKey });
};
