import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Input } from "./form/Input";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setJwtToken, setAlertClassName, setAlertMessage, toggleRefresh } =
    useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      email,
      password,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "applic ation/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    };

    fetch(`/authenticate`, requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          setAlertClassName("alert-danger");
          setAlertMessage(data.message);
        } else {
          setJwtToken(data.access_token);
          setAlertClassName("");
          setAlertMessage("");
          toggleRefresh(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error");
        setAlertClassName("alert-danger");
        setAlertMessage(err);
      });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <Input
          title="Email Address"
          type="email"
          className="form-control"
          name="email"
          autoComplete="email-new"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autoComplete="password-new"
          onChange={(e) => setPassword(e.target.value)}
        />
        <hr />
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  );
};
