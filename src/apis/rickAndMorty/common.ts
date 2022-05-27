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
