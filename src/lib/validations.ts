import { allGenres } from "@/components/media-card";
import * as z from "zod";

export const HomeSearchParamsSchema = z.intersection(
  z
    .discriminatedUnion("type", [
      z.object({
        type: z.literal("movie"),
        list: z
          .enum(["now_playing", "popular", "top_rated", "upcoming"])
          .catch("now_playing"),
      }),
      z.object({
        type: z.literal("tv"),
        list: z
          .enum(["airing_today", "on_the_air", "popular", "top_rated"])
          .catch("airing_today"),
      }),
    ])
    .catch({ type: "movie", list: "now_playing" }),
  z.object({
    page: z.coerce.number().min(1).max(500).catch(1),
  })
);

export const ExploreSearchParamsSchema = z.intersection(
  z
    .discriminatedUnion("type", [
      z.object({
        type: z.literal("movie"),
        sortBy: z
          .enum([
            "title.asc",
            "title.desc",
            "popularity.asc",
            "popularity.desc",
            "vote_average.asc",
            "vote_average.desc",
            "primary_release_date.asc",
            "primary_release_date.desc",
          ])
          .catch("popularity.desc"),
      }),
      z.object({
        type: z.literal("tv"),
        sortBy: z
          .enum([
            "name.asc",
            "name.desc",
            "popularity.asc",
            "popularity.desc",
            "vote_average.asc",
            "vote_average.desc",
            "first_air_date.asc",
            "first_air_date.desc",
          ])
          .catch("popularity.desc"),
      }),
    ])
    .catch({ type: "movie", sortBy: "popularity.desc" }),
  z.object({
    page: z.coerce.number().min(1).max(500).catch(1),
    rating: z.enum(["1", "6", "7", "8", "9"]).catch("1"),
    decade: z.enum(["2020", "2010", "2000", "1990", "0"]).catch("0"),
    genre: z
      .enum(allGenres.map((value) => String(value.id)) as [string])
      .catch("0"),
  })
);

export type HomeSearchParams = z.infer<typeof HomeSearchParamsSchema>;
export type ExploreSearchParams = z.infer<typeof ExploreSearchParamsSchema>;
