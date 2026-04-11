import Heading from "@/components/heading";
import ListPagination from "@/components/list-pagination";
import ListSelect from "@/components/list-select";
import MediaCard from "@/components/media-card";
import MediaToggle from "@/components/media-toggle";
import { Media, MediaType } from "@/types";
import * as z from "zod";

const fetchMedia = async (
  type: MediaType,
  list: string,
  page: number
): Promise<{
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}> => {
  const url = `https://api.themoviedb.org/3/${type}/${list}?page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      return {
        ...data,
        total_pages: Math.min(data.total_pages, 500),
        results: data.results.map((m: any) => ({ ...m, type })),
      };
    })
    .catch((err) => {
      console.error(err);
    });
};

const SearchParams = z.intersection(
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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const { type, list, page } = SearchParams.safeParse(params).data || {
    type: "movie",
    list: "now_playing",
    page: 1,
  };

  const {
    results: medias,
    total_results,
    total_pages,
  } = await fetchMedia(type, list, page);

  return (
    <div className="space-y-8 p-8">
      {/* Add this to layout? */}
      <div className="w-full flex items-center justify-center">
        <MediaToggle />
      </div>
      {medias ? (
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <Heading
              title={type === "movie" ? "Movies" : "Series"}
              description={`( ${total_results} )`}
            />
            <ListSelect type={type} currentList={list} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
            {medias.map((media: Media) => (
              <MediaCard key={media.id} media={media} />
            ))}
          </div>

          <ListPagination
            type={type}
            currentList={list}
            currentPage={page}
            totalPages={total_pages}
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
