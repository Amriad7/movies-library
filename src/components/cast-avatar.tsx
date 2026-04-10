import { Cast } from "@/types";

const CastAvatar = ({ cast }: { cast: Cast }) => {
  const { name, character, profile_path } = cast;
  return (
    <div className="space-y-4 text-center shrink-0">
      <img
        src={`https://image.tmdb.org/t/p/w185${profile_path}`}
        alt="profile"
        className="rounded-full w-20 lg:w-24 aspect-square mx-auto"
      />
      <div className="space-y-1">
        <h4 className="text-sm text-white">{name}</h4>
        <p className="text-xs font-light text-muted-foreground">{character}</p>
      </div>
    </div>
  );
};

export default CastAvatar;
