"server-only";

import { Genre, Media, MediaType, MovieExtended, SerieExtended } from "@/types";

const get = async (endpoint: string): Promise<any> => {
  const url = `https://api.themoviedb.org/3${endpoint}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
};

const getMediaList = async (
  type: MediaType,
  list: string,
  page: number
): Promise<{
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}> => {
  return get(`/${type}/${list}?page=${page}`).then((data) => ({
    ...data,
    total_pages: Math.min(data.total_pages, 500),
    results: data.results.map((m: any) => ({ ...m, type })),
  }));
};

const getMovie = async (id: string): Promise<MovieExtended> => {
  return get(
    `/movie/${id}?append_to_response=keywords,credits,recommendations`
  ).then((data) => ({
    ...data,
    recommendations: {
      results: data.recommendations.results.map((r: any) => ({
        ...r,
        type: "movie" as const,
      })),
    },
  }));
};

const getSerie = async (id: string): Promise<SerieExtended> => {
  return get(
    `/tv/${id}?append_to_response=keywords,credits,recommendations`
  ).then((data) => ({
    ...data,
    recommendations: {
      results: data.recommendations.results.map((r: any) => ({
        ...r,
        type: "tv" as const,
      })),
    },
  }));
};

async function getAllGenres(type: string): Promise<Genre[]> {
  return get(`/genre/${type}/list?language=en`).then((data) => data.genres);
}

const getExploreMedia = async (
  type: MediaType,
  page: number,
  sortBy: string,
  rating: string,
  decade: string,
  genre: string
): Promise<{
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}> => {
  const startYear = Number(decade) || 1000;
  const endYear = startYear ? startYear + 10 : 3000;
  return get(
    type === "movie"
      ? `/discover/${type}?page=${page}&sort_by=${sortBy}&vote_average.gte=${rating}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${
          endYear - 1
        }-12-31${Number(genre) ? `&with_genres=${genre}` : ""}`
      : `/discover/${type}?page=${page}&sort_by=${sortBy}&vote_average.gte=${rating}&air_date.gte=${startYear}-01-01&air_date.lte=${
          endYear - 1
        }-12-31${Number(genre) ? `&with_genres=${genre}` : ""}`
  ).then((data) => {
    return {
      ...data,
      total_pages: Math.min(data.total_pages, 500),
      results: data.results.map((m: any) => ({ ...m, type })),
    };
  });
};
export const API = {
  getMediaList,
  getMovie,
  getSerie,
  getAllGenres,
  getExploreMedia,
};
