import { getAppConfig } from "../../helpers/configHelper";
import { doRequest } from "../../helpers/requestHelper";

interface Location {
  name: string;
  url: string;
}
export interface Character {
  id: Number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface ResponseMetadata {
  count: Number;
  pages: Number;
  next?: string;
  prev?: string;
}

export interface RickAndMortyResponse<T> {
  info: ResponseMetadata;
  results: T[];
}

export const getCharacters = async (page?: Number): Promise<any> => {
  const appConfig = getAppConfig();
  return await doRequest(
    "GET",
    `${appConfig.rickyAndMortyApi}character`,
    null,
    {}
  );
};
