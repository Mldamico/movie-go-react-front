import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Alert } from "./components/Alert";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      fetch(`/refresh`, requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
          }
        })
        .catch((err) => {
          console.log("User is not logged in, ", err);
        });
    }
  }, [jwtToken]);

  const logoutUser = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };

    try {
      await fetch("/logout", requestOptions);
      setJwtToken("");
      navigate("/login");
    } catch (err) {
      console.log("Error logging out ", err);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          {jwtToken === "" ? (
            <Link to="/login">
              <span className="badge bg-success">Login</span>
            </Link>
          ) : (
            <div onClick={logoutUser} style={{ cursor: "pointer" }}>
              <span className="badge bg-danger">Logout</span>
            </div>
          )}
        </div>
        <hr className="mb-3" />
      </div>
      <div className="row">
        <div className="col md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">
                Home
              </Link>
              <Link
                to="/movies"
                className="list-group-item list-group-item-action"
              >
                Movies
              </Link>
              <a
                href="/genres"
                className="list-group-item list-group-item-action"
              >
                Genres
              </a>
              {jwtToken !== "" && (
                <>
                  <Link
                    to="/admin/movie/0"
                    className="list-group-item list-group-item-action"
                  >
                    Add Movie
                  </Link>
                  <Link
                    to="/manage"
                    className="list-group-item list-group-item-action"
                  >
                    Manage
                  </Link>
                  <Link
                    to="/graphql"
                    className="list-group-item list-group-item-action"
                  >
                    GraphQL
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Alert className={alertClassName} message={alertMessage} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
