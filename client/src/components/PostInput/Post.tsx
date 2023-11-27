import "./Post.css";
import profilePicture from "../../assets/profile-picture.jpg";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";

export default function Post() {
  return (
    <div className="post-input">
      <div className="share-input">
        <img
          className="share-profile-img"
          src={profilePicture}
          alt="profilePicture"
        />
        <input className="share-input-text" placeholder="Express yourself..." />
      </div>
      <div className="post-actions">
        <div className="media">
          <PermMediaOutlinedIcon className="action-icon" />
          <span className="media-text">Media</span>
        </div>
        <div className="hashtag">
          <TagOutlinedIcon className="action-icon" />
          <span className="hashtag-text">Hashtag</span>
        </div>
        <div className="mention">
          <AlternateEmailOutlinedIcon className="action-icon" />
          <span className="mention-text">Mention</span>
        </div>
        <div className="location">
          <AddLocationAltOutlinedIcon className="action-icon" />
          <span className="location-text">Location</span>
        </div>
      </div>
      <div className="submit-btn">
        <button className="btn">Submit</button>
      </div>
    </div>
  );
}
