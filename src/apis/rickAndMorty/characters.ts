import { getAppConfig } from "../../helpers/configHelper";
import { doRequest } from "../../helpers/requestHelper";

interface Location {
  name: string;
  url: string;
}
export interface Character {
  id: number;
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
  count: number;
  pages: number;
  next?: string;
  prev?: string;
}

export interface RickAndMortyResponse<T> {
  info: ResponseMetadata;
  results: T[];
}

export const getCharacters = async (page?: number): Promise<any> => {
  const appConfig = getAppConfig();
  let url = `${appConfig.rickyAndMortyApi}character`;
  if (page) {
    url += `?page=${page}`;
  }
  console.log(url);
  return await doRequest("GET", url, null, {});
};
