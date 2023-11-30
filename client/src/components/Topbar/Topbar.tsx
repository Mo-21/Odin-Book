import { Person, Message, Notifications, Search } from "@mui/icons-material";
import "./Tobpar.css";
import useAuth from "../Login/useAuth";
import { Link } from "react-router-dom";
import Logout from "../pages/Logout";

export default function Topbar() {
  const user = useAuth();

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <div className="topbar-container">
      <div className="left-side">Connect</div>
      <div className="search-bar">
        <Search className="search-icon" />
        <input type="text" placeholder="Search for anything" />
      </div>
      <div className="navigation-links">
        <div className="homepage-link">
          <Link to={`/${user?._id}`} className="links home-link">
            Home
          </Link>
          <div>
            <Logout />
          </div>
        </div>
      </div>
      <div className="icons-links">
        <Person titleAccess="Profile" />
        <Notifications titleAccess="Notifications" />
        <Link className="links" to={"/messenger"}>
          <Message titleAccess="Messenger" />
        </Link>
      </div>
      <div className="right-side">
        <div className="user-profile">
          <Link to={`/profile/${user?._id}`}>
            <img
              className="profile-picture"
              src={
                PF +
                (user?.profilePicture
                  ? user.profilePicture
                  : "users/default.png")
              }
              alt="profilePicture"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
