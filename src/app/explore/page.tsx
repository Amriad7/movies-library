import Heading from "@/components/heading";
import MediaPagination from "@/components/media-pagination";
import MediaCard from "@/components/media-card";
import MediaToggle from "@/components/media-toggle";
import { API } from "@/lib/data";
import { Media } from "@/types";
import * as z from "zod";
import MediaFilters from "@/components/media-filters";

const movieGenres = await API.getAllGenres("movie");
const tvGenres = await API.getAllGenres("tv");
const allGenres = [...movieGenres, ...tvGenres];

const SearchParams = z.object({
  type: z.enum(["movie", "tv"]).catch("movie"),
  page: z.coerce.number().min(1).max(500).catch(1),
  sortBy: z
    .enum([
      "name.asc",
      "name.desc",
      "title.asc",
      "title.desc",
      "popularity.asc",
      "popularity.desc",
      "vote_average.asc",
      "vote_average.desc",
      "first_air_date.asc",
      "first_air_date.desc",
      "primary_release_date.asc",
      "primary_release_date.desc",
    ])
    .catch("popularity.desc"),
  rating: z.enum(["1", "6", "7", "8", "9"]).catch("1"),
  decade: z.enum(["2020", "2010", "2000", "1990", "0"]).catch("0"),
  genre: z
    .enum(allGenres.map((value) => String(value.id)) as [string])
    .catch("0"),
});

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const { type, page, sortBy, rating, decade, genre } = SearchParams.safeParse(
    params
  ).data || {
    page: 1,
    type: "movie",
    sortBy: "popularity.desc",
    rating: "1",
    decade: "0",
    genre: "0",
  };

  console.log({
    type,
    page,
    sortBy,
  });
  const {
    results: medias,
    total_results,
    total_pages,
  } = await API.getExploreMedia(type, page, sortBy, rating, decade, genre);

  const allGenres = await API.getAllGenres(type);
  console.log(allGenres);

  return (
    <div className="space-y-8 p-8">
      {/* Add this to layout? */}
      <div className="w-full flex items-center justify-center">
        <MediaToggle />
      </div>
      {medias ? (
        <div className="space-y-10">
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <Heading
              title={type === "movie" ? "Movies" : "Series"}
              description={`( ${total_results} )`}
            />
            {
              <MediaFilters
                params={{
                  sortBy,
                  type,
                  page,
                  rating,
                  decade,
                  genre,
                }}
                allGenres={allGenres}
              />
            }
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
            {medias.map((media: Media) => (
              <MediaCard key={media.id} media={media} />
            ))}
          </div>

          <MediaPagination
            currentPage={page}
            totalPages={total_pages}
            params={{ type, page, sortBy, decade }}
          />
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-48">
          No media where found
        </p>
      )}
    </div>
  );
}
