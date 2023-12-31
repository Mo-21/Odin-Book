import "./Login.css";
import logo from "../../assets/link.svg";
import { useRef, useState } from "react";
import useLogin from "./useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const login = useLogin(() => {});

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
          if (email.current?.value && password.current?.value)
            login.mutate({
              email: email.current?.value,
              password: password.current?.value,
            });
          if (login.isError) {
            setIsError(true);
          } else {
            navigate("/");
          }
        }}
        className="login-form"
      >
        <div className="login-input">
          <input
            ref={email}
            placeholder="Email"
            className="input"
            type="email"
            required
          />
          <input
            ref={password}
            type="password"
            minLength={6}
            placeholder="Password"
            className="input"
            required
          />
        </div>
        <div className="login-btn">
          <button disabled={isError} type="submit" className="btn-login">
            Login
          </button>
        </div>
      </form>
      {isError && <div className="error">Invalid Credentials</div>}
    </div>
  );
}
