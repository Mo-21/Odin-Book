import "./Profile.css";
import welcome from "../../assets/welcome.jpg";
import profilePicture from "../../assets/profile-picture.jpg";
import lake2 from "../../assets/lake2.jpg";
import woman from "../../assets/woman.jpg";
import woman2 from "../../assets/woman-2.jpg";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";

export default function Profile() {
  return (
    <div className="profilePage-container">
      <div className="users-profile-info">
        <div className="cover-picture">
          <img className="cover-picture-img" src={lake2} alt="coverPicture" />
        </div>
        <div className="user-personal-info">
          <div className="profile-picture-profile">
            <img
              className="profile-picture-img"
              src={profilePicture}
              alt="profilePicture"
            />
          </div>
          <div className="user-info">
            <div className="user-name">Mo-21</div>
            <div className="user-bio">Full Stack TypeScript Developer</div>
          </div>
        </div>
      </div>
      <div className="user-activity">
        <div className="user-activity-item">
          <div className="user-activity-item-count">0</div>
          <div className="user-activity-item-text">Posts</div>
        </div>
        <div className="user-activity-item">
          <div className="user-activity-item-count">0</div>
          <div className="user-activity-item-text">Followers</div>
        </div>
        <div className="user-activity-item">
          <div className="user-activity-item-count">0</div>
          <div className="user-activity-item-text">Following</div>
        </div>
      </div>
      <div className="users-profile-activity">
        <div className="user-posts">
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
        </div>
        <div className="users-basic-info">
          <div className="information">
            <div className="city">
              City:
              <span className="city-text">Michigan</span>
            </div>
            <div className="from">
              From:
              <span className="from-text">Venezuela</span>
            </div>
            <div className="relationship">
              Relationship Status:
              <span className="relationship-text">Single</span>
            </div>
          </div>
          <div
            style={{ textAlign: "center", fontSize: "1.4rem" }}
            className="users-followers"
          >
            Followers
            <div className="user-follower">
              <div className="follower-picture">
                <img src={woman} alt="woman" />
              </div>
              <div className="follower-name">Jane Malarky</div>
            </div>
            <div className="user-follower">
              <div className="follower-picture">
                <img src={woman2} alt="woman" />
              </div>
              <div className="follower-name">Aloha Mandana</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
