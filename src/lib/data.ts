"server-only";

import { Media, MediaType, MovieExtended, SerieExtended } from "@/types";

const get = async (endpoint: string): Promise<any> => {
  const url = `https://api.themoviedb.org/3/${endpoint}`;
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

export const API = { getMediaList, getMovie, getSerie };
