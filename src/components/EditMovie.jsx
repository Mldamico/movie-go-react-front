import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Input } from "./form/Input";
import { Select } from "./form/Select";
import { TextArea } from "./form/TextArea";
import { Checkbox } from ".//form/Checkbox";
export const EditMovie = () => {
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const mpaaaOptions = [
    { id: "G", value: "G" },
    { id: "PG", value: "PG" },
    { id: "PG13", value: "PG13" },
    { id: "R", value: "R" },
    { id: "NC17", value: "NC17" },
    { id: "18A", value: "18A" },
  ];
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
    genres: [],
    genres_array: [Array(13).fill("")],
  });
  let { id } = useParams();
  if (id === undefined) id = 0;
  const navigate = useNavigate();
  const { jwtToken } = useOutletContext();

  useEffect(() => {
    if (jwtToken === "") {
      navigate("/login");
      return;
    }
  }, [jwtToken, navigate]);

  useEffect(() => {
    if (id === 0) {
      setMovie({
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        description: "",
        genres: [],
        genres_array: [Array(13).fill("")],
      });
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers,
      };
      fetch(`/genres`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          const checks = [];
          data.forEach((g) => {
            checks.push({ id: g.id, checked: false, genre: g.genre });
          });
          setMovie((m) => ({
            ...m,
            genres: checks,
            genres_array: [],
          }));
        })
        .catch((err) => console.log(err));
    } else {
    }
  }, [setMovie]);

  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = () => (event) => {
    // console.log(event.target.value);
    let value = event.target.value;
    let name = event.target.name;

    setMovie((prevState) => {
      return { ...prevState, [name]: value };
    });
    // setMovie({ ...movie, [name]: value });
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const handleCheck = (event, position) => {
    let tmpArr = movie.genres;
    tmpArr[position].checked = !tmpArr[position].checked;
    let tmpIDs = movie.genres_array;
    if (!event.target.checked) {
      tmpIDs.splice(tmpIDs.indexOf(event.target.value));
    } else {
      tmpIDs.push(+event.target.value);
    }

    setMovie({
      ...movie,
      genres_array: tmpIDs,
    });
  };

  return (
    <div className="text-center">
      <h2>Add/Edit Movie</h2>
      <hr />
      <pre>{JSON.stringify(movie, null, 3)}</pre>
      <form onSubmit={handlerSubmit}>
        <input type="hidden" name="id" value={movie.id} id="id" />
        <Input
          title="Title"
          className="form-control"
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange("title")}
          errorDiv={hasError("title") ? "text-danger" : "d-none"}
          errorMsg="Please enter a title"
        />
        <Input
          title="Release Date"
          className="form-control"
          type="date"
          name="release_date"
          value={movie.release_date}
          onChange={handleChange("release_date")}
          errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
          errorMsg="Please enter a release date"
        />
        <Input
          title="Runtime"
          className="form-control"
          type="text"
          name="runtime"
          value={movie.runtime}
          onChange={handleChange("runtime")}
          errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
          errorMsg="Please enter a runtime"
        />
        <Select
          title="MPAA Rating"
          name="mpaa_rating"
          options={mpaaaOptions}
          onChange={handleChange("mpaa_rating")}
          placeholder="Choose..."
          errorMsg="Please choose"
          errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none"}
        />
        <TextArea
          title="Description"
          name="description"
          value={movie.description}
          rows={3}
          onChange={handleChange("description")}
          errorDiv={hasError("description") ? "text-danger" : "d-none"}
          errorMsg="Please enter a description"
        />
        <hr />
        <h3>Genres</h3>
        {movie.genres && movie.genres.length > 1 && (
          <>
            {Array.from(movie.genres).map((g, index) => (
              <Checkbox
                key={index}
                title={g.genre}
                name="genre"
                id={`genre-${index}`}
                onChange={(event) => handleCheck(event, index)}
                value={g.id}
                checked={movie.genres[index].checked}
              />
            ))}
          </>
        )}
      </form>
    </div>
  );
};
