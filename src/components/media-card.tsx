import { Star } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Genre, Media, MediaType } from "@/types";
import { getYear } from "@/lib/utils";

async function fetchGenres(type: string) {
  const url = `https://api.themoviedb.org/3/genre/${type}/list?language=en`;
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
}

const movieGenres: Genre[] = (await fetchGenres("movie")).genres;
const serieGenres: Genre[] = (await fetchGenres("tv")).genres;

export function getGenreName(id: number, type: MediaType) {
  return (
    (type === "movie" ? movieGenres : serieGenres).find(
      (genre) => genre.id === id
    )?.name || ""
  );
}

const MediaCard = ({ media }: { media: Media }) => {
  const { id, type, genre_ids, poster_path, vote_average } = media;

  const genre = getGenreName(genre_ids[0], type);
  const rating = Math.floor(vote_average * 10) / 10;
  const title = type === "movie" ? media.title : media.name;
  const year = getYear(
    type === "movie" ? media.release_date : media.first_air_date
  );

  return (
    <Link href={`/${type}/${id}`}>
      <div className="relative space-y-4 min-w-48">
        <Badge className="absolute right-3 top-3 z-10">
          <Star size={8} fill="sidebar-primary" />
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
