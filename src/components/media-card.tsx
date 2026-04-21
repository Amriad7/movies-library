import { Badge } from "./ui/badge";
import { Media, MediaType } from "@/types";
import { Star } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import { getYear } from "@/lib/utils";
import placeholder from "@/assets/placeholder.png";

import { API } from "@/lib/data";

export const movieGenres = await API.getAllGenres("movie");
export const serieGenres = await API.getAllGenres("tv");
export const allGenres = [...movieGenres, ...serieGenres];

const getGenreName = (id: number, type: MediaType) => {
  const genreList = type === "movie" ? movieGenres : serieGenres;
  return genreList.find((genre) => genre.id === id)?.name || "";
};

const MediaCard = ({ media }: { media: Media }) => {
  const { id, type, genre_ids, poster_path, vote_average } = media;

  const title = type === "movie" ? media.title : media.name;
  const genre = getGenreName(genre_ids?.at(0) || 0, type);
  const rating = Math.floor(vote_average * 10) / 10;
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

        <Image
          width={500}
          height={750}
          alt="Media poster"
          className="w-full rounded-lg aspect-2/3"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : placeholder
          }
        />
        <div className="space-y-1.5">
          <h4 className="text-lg text-foreground font-semibold line-clamp-2">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">
            {[year, genre].join(" • ")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
