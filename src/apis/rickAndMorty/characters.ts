import { callApi } from "../callApi";

interface Location {
  name: string;
  url: string;
}
interface Character {
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

interface RickAndMortyResponse<T> {
  info: ResponseMetadata;
  results: T[];
}

export const getCharacters = async (): Promise<any> => {
  return await callApi(
    "GET",
    "https://rickandmortyapi.com/api/character",
    null,
    {}
  );
};
