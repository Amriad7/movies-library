import CastAvatar from "@/components/cast-avatar";
import List from "@/components/list";
import MediaCard from "@/components/media-card";
import Section from "@/components/section";
import Tag from "@/components/tag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API } from "@/lib/data";
import { getLanguageName, getYear } from "@/lib/utils";
import { Bookmark, Clock, Heart, Play, Star, Clipboard } from "lucide-react";

const SeriePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const {
    name,
    overview,
    backdrop_path,
    poster_path,
    first_air_date,
    vote_average,
    episode_run_time,
    genres,
    status,
    credits,
    recommendations,
    original_language,
    number_of_episodes,
    number_of_seasons,
    keywords,
  } = await API.getSerie(id);

  const year = getYear(first_air_date);
  const rating = Math.floor(vote_average * 10) / 10;
  const language = getLanguageName.of(original_language);

  return (
    <div className="@container/page">
      {/* PAGE HERO */}
      <div className="relative w-full flex @2xl/page:items-end p-8 @2xl/page:p-12 aspect-[2] min-h-[360] max-h-[720] bg-black">
        {/* Backdrop */}
        <img
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          alt="poster"
          className="absolute top-0 left-0 w-full h-full object-cover mask-b-to-transparent"
        />
        <div className="flex items-center gap-0 @2xl/page:gap-8">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="poster"
            className="aspect-auto w-0 @2xl/page:w-56 rounded-lg z-10"
          />
          {/* Informations */}
          <div className="flex flex-col justify-center gap-5 z-10">
            <Badge className="px-3 py-1">{year}</Badge>
            <h2 className="text-4xl font-extrabold">{name}</h2>
            <div className="flex items-center flex-wrap gap-6">
              <Tag Icon={Star}>{rating}</Tag>
              <Tag Icon={Clock}>{episode_run_time[0]} min</Tag>
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
      <div className="flex flex-col sm:flex-row gap-8 p-8 @2xl/page:p-12">
        {/* Left Column */}
        <div className="flex-2 space-y-12 min-w-0">
          <Section title={"OVERVIEW"}>{overview}</Section>
          <Section title={"CAST"} scrollable>
            <div className="flex gap-10">
              {credits.cast.length
                ? credits.cast.map((cast) => (
                    <CastAvatar key={cast.id} cast={cast} />
                  ))
                : "No casts found"}
            </div>
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
            <List
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
            <div className="flex flex-wrap gap-4">
              {keywords.results.length
                ? keywords.results.map(({ id, name }) => (
                    <Badge variant={"outline"} key={id}>
                      {name}
                    </Badge>
                  ))
                : "No keywords found"}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default SeriePage;
