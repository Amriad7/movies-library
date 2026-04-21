import Heading from "@/components/heading";
import MediaPagination from "@/components/media-pagination";
import MediaCard, { movieGenres, serieGenres } from "@/components/media-card";
import MediaToggle from "@/components/media-toggle";
import { API } from "@/lib/data";
import { Media } from "@/types";
import MediaFilters from "@/components/media-filters";
import { ExploreSearchParamsSchema } from "@/lib/validations";
import ListPlaceholder from "@/components/list-placeholder";

const defaultParams = {
  page: 1,
  type: "movie",
  sortBy: "popularity.desc",
  rating: "1",
  decade: "0",
  genre: "0",
} as const;

export default async function Explore({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const parsedParams =
    ExploreSearchParamsSchema.safeParse(params).data || defaultParams;
  const { type } = parsedParams;

  const mediaGenres = type === "movie" ? movieGenres : serieGenres;

  const {
    results: medias,
    total_results,
    total_pages,
  } = await API.getExploreMedia(parsedParams);

  return (
    <div className="space-y-8 p-8">
      <MediaToggle type={type} />
      <ListPlaceholder
        list={medias}
        placeholder={
          <p className="text-muted-foreground text-center py-48">
            No medias where found
          </p>
        }
      >
        <div className="space-y-10">
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <Heading
              title={type === "movie" ? "Movies" : "Series"}
              description={`( ${total_results} )`}
            />
            {<MediaFilters params={parsedParams} mediaGenres={mediaGenres} />}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
            {medias.map((media: Media) => (
              <MediaCard key={media.id} media={media} />
            ))}
          </div>

          <MediaPagination totalPages={total_pages} params={parsedParams} />
        </div>
      </ListPlaceholder>
    </div>
  );
}
