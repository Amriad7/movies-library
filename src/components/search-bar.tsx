"use client";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import Link from "next/link";
import Image from "next/image";
import { getYear } from "@/lib/utils";
/*
user types
fetch suggestions
start a timer

if (timerEnded) {
  fetch suggestions
  start a timer : 
} 

*/

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimout = useRef<any>(undefined);

  const fetchSuggestions = async (query: string) => {
    if (debounceTimout.current) {
      clearTimeout(debounceTimout.current);
    }

    debounceTimout.current = setTimeout(async () => {
      const res = await fetch(`/api/search?query=${query}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setSuggestions(data);
    }, 500);
  };

  return (
    <Popover open={Boolean(query)}>
      <PopoverAnchor>
        <Input
          placeholder="Search"
          className="w-80 rounded-full"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            fetchSuggestions(value);
          }}
        />
      </PopoverAnchor>
      <PopoverContent className="w-full max-h-100 overflow-y-scroll">
        {suggestions.length ? (
          <ItemGroup className="">
            {suggestions.map((media: any) => (
              <Item key={media.id} asChild className="p-2">
                <Link href={`/${media.media_type}/${media.id}`}>
                  <ItemMedia variant="image" className="size-16">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                      alt={"media poster"}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="line-clamp-1">
                      {media?.name || media?.title}
                    </ItemTitle>
                    <ItemDescription>
                      {getYear(media.release_date || media.first_air_date) ||
                        "year"}
                    </ItemDescription>
                  </ItemContent>
                </Link>
              </Item>
            ))}
          </ItemGroup>
        ) : (
          <PopoverHeader>
            <PopoverDescription>No media where found.</PopoverDescription>{" "}
          </PopoverHeader>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
