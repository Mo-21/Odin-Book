import { Person, Message, Notifications, Search } from "@mui/icons-material";
import "./Tobpar.css";
import profilePicture from "../assets/profile-picture.jpg";

export default function Topbar() {
  return (
    <div className="topbar-container">
      <div className="left-side">Connect</div>
      <div className="search-bar">
        <Search className="search-icon" />
        <input type="text" placeholder="Search for anything" />
      </div>
      <div className="navigation-links">
        <div className="homepage-link">
          <a className="links home-link" href="#">
            Home
          </a>
          <a className="links timeline-link" href="#">
            Timeline
          </a>
        </div>
      </div>
      <div className="icons-links">
        <Person titleAccess="Profile" />
        <Message titleAccess="Messenger" />
        <Notifications titleAccess="Notifications" />
      </div>
      <div className="right-side">
        <div className="user-profile">
          <img
            className="profile-picture"
            src={profilePicture}
            alt="profilePicture"
          />
        </div>
      </div>
    </div>
  );
}
