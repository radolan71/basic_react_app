import { getAppConfig } from "../../helpers/configHelper";
import { doRequest } from "../../helpers/requestHelper";
import { RickAndMortyResponse } from "./common";

export interface Episode {
  name: string;
  url: string;
  id: number;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
}

export const getEpisodes = async (
  ids: number[]
): Promise<RickAndMortyResponse<Episode>> => {
  const appConfig = getAppConfig();
  let url = `${appConfig.rickyAndMortyApi}episode/${ids.join(",")}`;
  return await doRequest("GET", url, null, { cacheKey: url });
};
