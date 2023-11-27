import "../Login/Login.css";
import logo from "../../assets/link.svg";

export default function Register() {
  return (
    <div className="login-container">
      <div className="logo">
        <span className="logo-text">
          Connect
          <hr />
        </span>

        <img src={logo} alt="logo" />
      </div>
      <form className="login-form">
        <div className="login-input">
          <input placeholder="Username" className="input" />
          <input placeholder="Email" className="input" />
          <input placeholder="Password" className="input" />
          <input placeholder="Confirm Password" className="input" />
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
