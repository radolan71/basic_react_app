import { getAppConfig } from "../../helpers/configHelper";
import { doRequest } from "../../helpers/requestHelper";
import { RickAndMortyResponse } from "./common";

export interface Location {
  name: string;
  url: string;
  id: number;
  type: string;
  dimension: string;
  residents: string[];
  created: string;
}

export const getLocation = async (
  id: number
): Promise<RickAndMortyResponse<Location>> => {
  const appConfig = getAppConfig();
  let url = `${appConfig.rickyAndMortyApi}location/${id}`;
  let cacheKey = url;
  return await doRequest("GET", url, null, { cacheKey: cacheKey });
};
