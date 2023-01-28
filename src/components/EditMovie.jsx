import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Input } from "./form/Input";

export const EditMovie = () => {
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
  });
  let { id } = useParams();

  const navigate = useNavigate();
  const { jwtToken } = useOutletContext();

  useEffect(() => {
    if (jwtToken === "") {
      navigate("/login");
      return;
    }
  }, []);

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
      </form>
    </div>
  );
};
