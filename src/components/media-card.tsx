import { Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Media, MediaType } from "@/types";
import { getYear } from "@/lib/utils";
import { API } from "@/lib/data";
import Link from "next/link";

const movieGenres = await API.getAllGenres("movie");
const serieGenres = await API.getAllGenres("tv");

export function getGenreName(id: number, type: MediaType) {
  return (
    (type === "movie" ? movieGenres : serieGenres).find(
      (genre) => genre.id === id
    )?.name || ""
  );
}

const MediaCard = ({ media }: { media: Media }) => {
  const { id, type, genre_ids, poster_path, vote_average } = media;

  const genre = getGenreName(genre_ids?.at(0) || 0, type);
  const rating = Math.floor(vote_average * 10) / 10;
  const title = type === "movie" ? media.title : media.name;
  const year = getYear(
    type === "movie" ? media.release_date : media.first_air_date
  );

  return (
    <Link href={`/${type}/${id}`}>
      <div className="relative space-y-4 min-w-48">
        <Badge className="absolute right-3 top-3 z-10">
          <Star fill="sidebar-primary" />
          <span>{rating}</span>
        </Badge>

        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="Event cover"
          className="w-full rounded-lg"
        />
        <div className="space-y-1.5">
          <h4 className="text-lg text-foreground font-semibold line-clamp-2">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">{`${year} • ${genre}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
