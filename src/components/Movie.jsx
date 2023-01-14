import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesList } from "./Movies";

export const Movie = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let foundMovie = moviesList.find((m) => m.id === +id);

    if (foundMovie) {
      setMovie(foundMovie);
    }
  }, [id, movie]);

  return (
    <div className="text-center">
      <h2>{movie.title}</h2>
      <small>
        <em>
          {movie.release_date}, {movie.runtime} minutes, Rated{" "}
          {movie.mpaa_rating}
        </em>
      </small>
      <hr />
      {movie.description}
    </div>
  );
};
