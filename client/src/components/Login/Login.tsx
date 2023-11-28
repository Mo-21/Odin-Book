import "./Login.css";
import logo from "../../assets/link.svg";
import { useState } from "react";
import useLogin from "./useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = useLogin(() => {
    setEmail("");
    setPassword("");
  });

  return (
    <div className="login-container">
      <div className="logo">
        <span className="logo-text">
          Connect
          <hr />
        </span>
        <img src={logo} alt="logo" />
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          login.mutate({ email, password });
          navigate("/");
        }}
        className="login-form"
      >
        <div className="login-input">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="input"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="input"
          />
        </div>
        <div className="login-btn">
          <button type="submit" className="btn-login">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
