import { getAppConfig } from "../../helpers/configHelper";
import { doRequest } from "../../helpers/requestHelper";
import { RickAndMortyResponse } from "./common";

export interface ShowLocation {
  name: string;
  url: string;
  id: number;
  type: string;
  dimension: string;
  residents: string[];
  created: string;
}

export enum LocationTypes {
  Origin,
  Home,
}

export const getLocation = async (id: number): Promise<ShowLocation> => {
  const appConfig = getAppConfig();
  let url = `${appConfig.rickyAndMortyApi}location/${id}`;
  return await doRequest("GET", url, null, { cacheKey: url });
};
