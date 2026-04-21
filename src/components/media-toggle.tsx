"use client";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Clapperboard, Tv } from "lucide-react";
import { MediaType } from "@/types";
import Link from "next/link";

const MediaToggle = ({ type = "movie" }: { type: MediaType }) => {
  return (
    <div>
      <ToggleGroup
        spacing={2}
        type="single"
        variant="primary"
        className="bg-card rounded-full p-1 m-auto"
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
