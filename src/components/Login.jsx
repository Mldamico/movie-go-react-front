import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Input } from "./form/Input";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setJwtToken, setAlertClassName, setAlertMessage } =
    useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "admin@example.com" && password === "123456") {
      setJwtToken("ABC");
      setAlertClassName("d-none");
      setAlertMessage("");
      navigate("/");
    } else {
      setAlertClassName("alert-danger");
      setAlertMessage("Invalid Credentials");
      setTimeout(() => {
        setAlertClassName("d-none");
        setAlertMessage("");
      }, 2000);
    }
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
