import { Cast } from "@/types";
import Image from "next/image";
import placeholder from "@/assets/avatar.png";

const CastAvatar = ({ cast }: { cast: Cast }) => {
  const { name, character, profile_path } = cast;
  return (
    <div className="space-y-4 text-center shrink-0">
      <Image
        height={200}
        width={200}
        alt="cast picture"
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w185${profile_path}`
            : placeholder
        }
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
