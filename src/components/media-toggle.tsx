"use client";
import { Clapperboard, Tv } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const MediaToggle = () => {
  /* use zod here? */
  const searchParams = useSearchParams();
  const type = searchParams.get("type") === "tv" ? "tv" : "movie";
  return (
    <div>
      <ToggleGroup
        type="single"
        variant="primary"
        spacing={2}
        className="bg-card rounded-full p-1"
        value={type}
      >
        <ToggleGroupItem value="movie" className="px-8" asChild>
          <Link href={"?type=movie"}>
            <Clapperboard /> Movies
          </Link>
        </ToggleGroupItem>
        <ToggleGroupItem value="tv" className="px-8" asChild>
          <Link href={"?type=tv"}>
            <Tv /> Series
          </Link>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default MediaToggle;
