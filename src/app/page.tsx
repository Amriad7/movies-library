import Heading from "@/components/heading";
import MediaPagination from "@/components/media-pagination";
import ListSelect from "@/components/list-select";
import MediaCard from "@/components/media-card";
import MediaToggle from "@/components/media-toggle";
import ListPlaceholder from "@/components/list-placeholder";
import { HomeSearchParamsSchema } from "@/lib/validations";
import { API } from "@/lib/data";
import { Media } from "@/types";

const defaultParams = {
  type: "movie",
  list: "now_playing",
  page: 1,
} as const;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const parsedParams =
    HomeSearchParamsSchema.safeParse(params).data || defaultParams;
  const { type, list } = parsedParams;

  const {
    results: medias,
    total_results,
    total_pages,
  } = await API.getMediaList(parsedParams);

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
        <div className="@container space-y-10">
          <div className="flex items-center justify-between">
            <Heading
              title={type === "movie" ? "Movies" : "Series"}
              description={`( ${total_results} )`}
            />
            <ListSelect params={{ type, list }} />
          </div>
          <div className="grid grid-cols-2 @2xl:grid-cols-3 @6xl:grid-cols-4 gap-y-12 gap-x-8 ">
            {medias?.map((media: Media) => (
              <MediaCard key={media.id} media={media} />
            ))}
          </div>

          <MediaPagination totalPages={total_pages} params={parsedParams} />
        </div>
      </ListPlaceholder>
    </div>
  );
}
