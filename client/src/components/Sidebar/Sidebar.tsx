import "./Sidebar.css";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { Link } from "react-router-dom";
import useAuth from "../Login/useAuth";

export default function Sidebar() {
  const currentUser = useAuth();

  return (
    <div className="sidebar">
      <Link to={`/${currentUser?._id}`} className="links home-link">
        <div className="timeline-element">
          <TimelineOutlinedIcon />
          <span className="timeline-text">Timeline</span>
        </div>
      </Link>
      <Link className="links" to={"/messenger"}>
        <div className="chat">
          <ForumOutlinedIcon />
          <span className="chat-text">Chat</span>
        </div>
      </Link>
      <div className="groups">
        <Groups2OutlinedIcon />
        <span className="groups-text">Groups</span>
      </div>
      <div className="bookmark">
        <BookmarkBorderOutlinedIcon />
        <span className="bookmark-text">Bookmarks</span>
      </div>
    </div>
  );
}
