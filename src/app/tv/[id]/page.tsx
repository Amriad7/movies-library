import CastAvatar from "@/components/cast-avatar";
import MediaCard from "@/components/media-card";
import Section from "@/components/section";
import Tag from "@/components/tag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API } from "@/lib/data";
import { formatRuntime, getLanguageName, getYear } from "@/lib/utils";
import { Bookmark, Clock, Heart, Play, Star, Clipboard } from "lucide-react";
import Image from "next/image";

import posterPlaceholder from "@/assets/poster-placeholder.png";
import placeholder from "@/assets/placeholder.png";
import ListPlaceholder from "@/components/list-placeholder";
import DescriptionList from "@/components/description-list";

const SeriePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const {
    name,
    genres,
    status,
    credits,
    keywords,
    overview,
    poster_path,
    vote_average,
    backdrop_path,
    first_air_date,
    episode_run_time,
    recommendations,
    original_language,
    number_of_episodes,
    number_of_seasons,
  } = await API.getSerie(id);

  const year = getYear(first_air_date);
  const time = formatRuntime(episode_run_time[0] || 0);
  const rating = Math.floor(vote_average * 10) / 10;
  const language = getLanguageName.of(original_language);

  return (
    <div className="@container">
      {/* PAGE HERO */}
      <div className="relative w-full flex @2xl:items-end p-8 @2xl:p-12 aspect-[2] min-h-[360] max-h-[720] bg-black">
        {/* Backdrop */}
        <Image
          width={1280}
          height={720}
          alt="poster"
          loading="eager"
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${backdrop_path}`
              : posterPlaceholder
          }
          className="absolute top-0 left-0 w-full h-full object-cover mask-b-to-transparent"
        />
        <div className="flex items-center gap-0 @2xl:gap-8">
          {/* Poster */}
          <Image
            width={500}
            height={750}
            alt="Media Poster"
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : placeholder
            }
            className="aspect-2/3 w-0 @2xl:w-56 rounded-lg z-10"
          />
          {/* Informations */}
          <div className="flex flex-col justify-center gap-5 z-10">
            <Badge className="px-3 py-1">{year}</Badge>
            <h2 className="text-4xl font-extrabold">{name}</h2>
            <div className="flex items-center flex-wrap gap-6">
              <Tag Icon={Star}>{rating}</Tag>
              <Tag Icon={Clock}>{time}</Tag>
              <Tag Icon={Clipboard}>{genres.map((g) => g.name).join(", ")}</Tag>
            </div>
            {/* Actions */}
            <div className="flex items-center flex-wrap gap-3 mt-8">
              <Button size={"lg"}>
                <Play />
                WATCH TRAILER
              </Button>
              <Button size={"lg"} variant={"secondary"}>
                <Bookmark />
                WISHLIST
              </Button>
              <Button size={"icon-lg"} variant={"secondary"}>
                <Heart />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* PAGE CONTENT */}
      <div className="flex flex-col @3xl:flex-row gap-8 p-8 @2xl:p-12">
        {/* Left Column */}
        <div className="flex-2 space-y-12 min-w-0">
          <Section title={"OVERVIEW"}>{overview}</Section>
          <Section title={"CAST"} scrollable>
            <ListPlaceholder list={credits.cast} placeholder="No casts found">
              <div className="flex gap-10">
                {credits.cast.map((cast) => (
                  <CastAvatar key={cast.id} cast={cast} />
                ))}
              </div>
            </ListPlaceholder>
          </Section>
          <Section title={"RECOMMENDATIONS"} scrollable>
            <div className="flex gap-10">
              {recommendations.results.map((serie) => (
                <MediaCard key={serie.id} media={serie} />
              ))}
            </div>
          </Section>
        </div>
        {/* Right Column */}
        <div className="flex-1 space-y-12 ">
          <Section title="DETAILS" filled>
            <DescriptionList
              items={[
                { name: "STATUS", value: status },
                {
                  name: "LANGUAGE",
                  value: language,
                },
                {
                  name: "RELEASE DATE",
                  value: first_air_date,
                },
                {
                  name: "SEASONS",
                  value: number_of_seasons,
                },
                {
                  name: "EPISODES",
                  value: number_of_episodes,
                },
              ]}
            />
          </Section>
          <Section title="KEYWORDS" filled>
            <ListPlaceholder
              list={keywords.results}
              placeholder="No keywords found"
            >
              <div className="flex flex-wrap gap-4">
                {keywords.results.map(({ id, name }) => (
                  <Badge variant={"outline"} key={id}>
                    {name}
                  </Badge>
                ))}
              </div>
            </ListPlaceholder>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default SeriePage;
