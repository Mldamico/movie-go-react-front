import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
export const Manage = () => {
  const [movies, setMovies] = useState([]);
  const { jwtToken } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken === "") {
      navigate("/login");
      return;
    }
  }, [jwtToken, navigate]);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + jwtToken);
    const requestOptions = {
      method: "GET",
      headers,
    };
    fetch(`/admin/movies`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-center">
      <h2>Manage Movies</h2>
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
                <Link to={`/admin/movies/${movie.id}`}>{movie.title}</Link>
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
