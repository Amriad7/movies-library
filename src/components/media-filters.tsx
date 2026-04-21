"use client";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { Button } from "./ui/button";
import { searchParamsToString } from "@/lib/utils";
import { API } from "@/lib/data";
import { Genre, MediaType } from "@/types";
import { ExploreSearchParams } from "@/lib/validations";
// import { movieGenres, serieGenres } from "./media-card";

const sorts = {
  movie: [
    {
      name: "Popularity",
      value: "popularity",
    },
    {
      name: "Rating",
      value: "vote_average",
    },
    {
      name: "Title",
      value: "title",
    },
    {
      name: "Release Date",
      value: "primary_release_date",
    },
  ],
  tv: [
    {
      name: "Popularity",
      value: "popularity",
    },
    {
      name: "Rating",
      value: "vote_average",
    },
    {
      name: "Name",
      value: "name",
    },
    {
      name: "Air Date",
      value: "first_air_date",
    },
  ],
};

const ratings = [
  {
    name: "Any",
    value: "1",
  },
  {
    name: "9.0",
    value: "9",
  },
  {
    name: "8.0",
    value: "8",
  },
  {
    name: "7.0",
    value: "7",
  },
  {
    name: "6.0",
    value: "6",
  },
];

const decades = [
  {
    name: "Any",
    value: "0",
  },
  {
    name: "2020s",
    value: "2020",
  },
  {
    name: "2010s",
    value: "2010",
  },
  {
    name: "2000s",
    value: "2000",
  },
  {
    name: "1990s",
    value: "1990",
  },
];

export const movieGenres = await API.getAllGenres("movie");
export const serieGenres = await API.getAllGenres("tv");

const MediaFilters = ({
  params,
  mediaGenres,
}: {
  params: ExploreSearchParams;
  mediaGenres: Genre[];
}) => {
  const router = useRouter();

  const [sort, ord] = params.sortBy.split(".");
  const [sortBy, setSortBy] = useState(sort);
  const [order, setOrder] = useState(ord);
  const [rating, setRating] = useState<string>(params.rating);
  const [decade, setDecade] = useState<string>(params.decade);
  const [genre, setGenre] = useState(params.genre);

  useEffect(() => {
    const [sort, ord] = params.sortBy.split(".");
    setSortBy(sort);
    setOrder(ord);
    setGenre(String(params.genre));
  }, [params]);

  const navigateTo = (params: object) => {
    router.push(`./explore/${searchParamsToString(params)}`);
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Select
        value={sortBy}
        onValueChange={(value) => {
          setSortBy(value);
          navigateTo({ ...params, page: 1, sortBy: [value, order].join(".") });
        }}
      >
        <ButtonGroup>
          <SelectTrigger className="w-32 [&_svg]:hidden">
            <SelectValue />
          </SelectTrigger>
          <ButtonGroupSeparator />
          <Button
            size={"icon"}
            variant={"secondary"}
            className="h-10"
            onClick={() => {
              const newOrder = order === "asc" ? "desc" : "asc";
              setOrder(newOrder);
              navigateTo({
                ...params,
                page: 1,
                sortBy: [sortBy, newOrder].join("."),
              });
            }}
          >
            <span className="text-sidebar-primary-foreground">
              {order === "asc" ? (
                <ArrowUpNarrowWide />
              ) : (
                <ArrowDownNarrowWide />
              )}
            </span>
          </Button>
        </ButtonGroup>

        <SelectContent position="popper">
          <SelectGroup>
            {sorts[params.type].map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={rating}
        onValueChange={(value) => {
          setRating(value);
          navigateTo({ ...params, rating: value });
        }}
      >
        <SelectTrigger className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {ratings.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <Star className="fill-muted-foreground size-3" />
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={decade}
        onValueChange={(value) => {
          setDecade(value);
          navigateTo({ ...params, decade: value });
        }}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {decades.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {
        <Select
          value={genre}
          onValueChange={(value) => {
            setGenre(value);
            navigateTo({ ...params, genre: value });
          }}
        >
          <SelectTrigger className="w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectItem key={"0"} value={"0"}>
                {"All Genres"}
              </SelectItem>
              {mediaGenres?.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      }
    </div>
  );
};

export default MediaFilters;
