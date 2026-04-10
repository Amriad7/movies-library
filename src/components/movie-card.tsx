import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export type Movie = {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

const fetchGenres = async () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
};

const res = await fetchGenres("movie");
console.log(res);

const MovieCard = ({ movie }: { movie: Movie }) => {
  console.log(movieGenres);
  console.log("hiiii");
  return (
    <Card className="pt-0 pb-2 overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="Event cover"
        className="w-full opacity-5"
      />
      <CardHeader className="mt-0">
        <CardTitle className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant={"outline"}>
              {movie.release_date.split("-")[0]}
            </Badge>
            <div className="flex items-center gap-2">
              <Star fill="primary" size={16} />{" "}
              <span>{Math.floor(movie.vote_average * 10) / 10}</span>
            </div>
          </div>
          <h3>{movie.title}</h3>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default MovieCard;
