type Movie = {
  id: number;
  type: "movie";
  title: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  original_language: string;
  release_date: string;
  vote_average: number;
};

type Serie = {
  id: number;
  type: "tv";
  name: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  original_language: string;
  vote_average: number;
};

type Media = Movie | Serie;
type MediaType = Media["type"];

type MediaListResult = {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
};

type Genre = {
  id: number;
  name: string;
};

type Keyword = {
  id: number;
  name: string;
};

type Cast = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
};

type MovieExtended = Movie & {
  runtime: number;
  status: string;
  genres: Genre[];
  credits: { cast: Cast[] };
  keywords: { keywords: Keyword[] };
  recommendations: { results: Movie[] };
};

type SerieExtended = Serie & {
  status: string;
  genres: Genre[];
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  credits: { cast: Cast[] };
  keywords: { results: Keyword[] };
  recommendations: { results: Movie[] };
};

export type {
  Movie,
  Serie,
  Media,
  Cast,
  Genre,
  MediaType,
  MovieExtended,
  SerieExtended,
  MediaListResult,
};
