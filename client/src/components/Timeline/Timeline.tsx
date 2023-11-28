import "./Timeline.css";
import welcome from "../../assets/welcome.jpg";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import { Post } from "./useTimeline";
import useAuthorDetails from "./useAuthorDetails";

export default function Timeline({ post }: { post: Post }) {
  const { user, loading, error } = useAuthorDetails({ userId: post.userId });

  console.log(user);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <div className="timeline">
      <div className="post-container">
        <div className="user-details">
          <div className="author-details">
            <img src={PF + user.profilePicture} alt="profilePicture" />
            <span className="username">{user.username}</span>
            <span className="post-date">5 mins ago</span>
          </div>
          <UnfoldMoreOutlinedIcon className="more-icon" />
        </div>
        <div className="body">
          <div className="post-content">{post.content}</div>
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
            <span className="like-counter">
              {post.likes.length ? post.likes.length : 0} people like this
            </span>
          </div>
          <div className="comments">
            <span className="comment-counter">
              {post.comments.toString() ? post.comments.toString() : 0} comments
            </span>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
