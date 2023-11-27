import "./Timeline.css";
import profilePicture from "../../assets/profile-picture.jpg";
import welcome from "../../assets/welcome.jpg";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";

export default function Timeline() {
  return (
    <div className="timeline">
      <div className="post-container">
        <div className="user-details">
          <div className="author-details">
            <img src={profilePicture} alt="profilePicture" />
            <span className="username">Mo-21</span>
            <span className="post-date">5 mins ago</span>
          </div>
          <UnfoldMoreOutlinedIcon className="more-icon" />
        </div>
        <div className="body">
          <div className="post-content">Welcome to my platform!</div>
          <img src={welcome} alt="welcome" />
        </div>
        <div className="post-interaction">
          <div className="rate">
            <GradeOutlinedIcon
              titleAccess="star"
              className="post-interaction-icon"
            />
          </div>
          <div className="like">
            <FavoriteBorderOutlinedIcon
              titleAccess="like"
              className="post-interaction-icon"
            />
            <span className="like-counter">23 people like this</span>
          </div>
          <div className="comments">
            <span className="comment-counter">43 comments</span>
            <hr />
          </div>
        </div>
      </div>
      <div className="post-container">
        <div className="user-details">
          <div className="author-details">
            <img src={profilePicture} alt="profilePicture" />
            <span className="username">Mo-21</span>
            <span className="post-date">5 mins ago</span>
          </div>
          <UnfoldMoreOutlinedIcon className="more-icon" />
        </div>
        <div className="body">
          <div className="post-content">Welcome to my platform!</div>
          <img src={welcome} alt="welcome" />
        </div>
        <div className="post-interaction">
          <div className="rate">
            <GradeOutlinedIcon
              titleAccess="star"
              className="post-interaction-icon"
            />
          </div>
          <div className="like">
            <FavoriteBorderOutlinedIcon
              titleAccess="like"
              className="post-interaction-icon"
            />
            <span className="like-counter">23 people like this</span>
          </div>
          <div className="comments">
            <span className="comment-counter">43 comments</span>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
