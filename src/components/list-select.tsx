"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const mediaLists = {
  movie: [
    { name: "Now Playing", value: "now_playing" },
    { name: "Popular", value: "popular" },
    { name: "Top Rated", value: "top_rated" },
    { name: "Upcoming", value: "upcoming" },
  ],

  tv: [
    { name: "Airing Today", value: "airing_today" },
    { name: "On the Air", value: "on_the_air" },
    { name: "Popular", value: "popular" },
    { name: "Top Rated", value: "top_rated" },
  ],
} as const;

export const movieListValues = mediaLists.movie.map(({ value }) => value);
export const tvListValues = mediaLists.tv.map(({ value }) => value);

const ListSelect = ({
  type,
  currentList,
}: {
  type: MediaType;
  currentList: string;
}) => {
  const router = useRouter();
  const [list, setList] = useState(currentList);

  useEffect(() => {
    setList(currentList);
  }, [currentList]);

  return (
    <Select
      value={list}
      onValueChange={(value) => {
        setList(value);
        router.push(`./?type=${type}&list=${value}`);
      }}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select a list" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {mediaLists[type].map((l) => (
            <SelectItem key={l.name} value={l.value}>
              {l.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ListSelect;
