"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchParamsToString } from "@/lib/utils";
import { HomeSearchParams } from "@/lib/validations";
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

const ListSelect = ({ params }: { params: Omit<HomeSearchParams, "page"> }) => {
  const router = useRouter();
  const [list, setList] = useState<string>(params.list);

  const handleValueChange = (value: string) => {
    setList(value);
    router.push(searchParamsToString({ ...params, list: value }));
  };

  useEffect(() => {
    setList(params.list);
  }, [params.list]);

  return (
    <Select value={list} onValueChange={handleValueChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select a list" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {mediaLists[params.type].map(({ name, value }) => (
            <SelectItem key={name} value={value}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ListSelect;
