import { useState } from "react";
import { Link } from "react-router-dom";
export const moviesList = [
  {
    id: 1,
    title: "Highlander",
    release_date: "1986-03-07",
    runtime: 116,
    mpaa_rating: "R",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, voluptatem. A, pariatur obcaecati reprehenderit omnis dolore autem dolor et eius nisi possimus corrupti nihil. Recusandae ad nemo sint quis eaque.",
  },
  {
    id: 2,
    title: "Raiders of the lost ark",
    release_date: "1986-06-12",
    runtime: 115,
    mpaa_rating: "PG-13",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, voluptatem. A, pariatur obcaecati reprehenderit omnis dolore autem dolor et eius nisi possimus corrupti nihil. Recusandae ad nemo sint quis eaque.",
  },
];
export const Movies = () => {
  const [movies, setMovies] = useState(moviesList);

  return (
    <div className="text-center">
      <h2>Movies</h2>
      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Release Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </td>
              <td>{movie.release_date}</td>
              <td>{movie.mpaa_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
