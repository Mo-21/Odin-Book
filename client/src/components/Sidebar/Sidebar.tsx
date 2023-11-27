import "./Sidebar.css";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="timeline-element">
        <TimelineOutlinedIcon />
        <span className="timeline-text">Timeline</span>
      </div>
      <div className="chat">
        <ForumOutlinedIcon />
        <span className="chat-text">Chat</span>
      </div>
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
