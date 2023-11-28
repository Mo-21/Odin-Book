import "../Login/Login.css";
import logo from "../../assets/link.svg";
import { useRef } from "react";
import useRegister from "./useRegister";

export default function Register() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const passwordConfirmation = useRef<HTMLInputElement>(null);

  const register = useRegister(() => {});
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
          if (
            email.current?.value &&
            password.current?.value &&
            username.current?.value &&
            passwordConfirmation.current?.value
          )
            register.mutate({
              email: email.current?.value,
              password: password.current?.value,
              username: username.current?.value,
              passwordConfirmation: passwordConfirmation.current?.value,
            });
        }}
        className="login-form"
      >
        <div className="login-input">
          <input
            ref={username}
            required
            type="text"
            placeholder="Username"
            className="input"
          />
          <input
            ref={email}
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            ref={password}
            required
            type="password"
            minLength={6}
            placeholder="Password"
            className="input"
          />
          <input
            required
            ref={passwordConfirmation}
            type="password"
            minLength={6}
            placeholder="Confirm Password"
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
