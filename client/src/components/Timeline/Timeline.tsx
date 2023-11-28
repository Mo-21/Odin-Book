import "./Timeline.css";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import { Post } from "./useTimeline";
import useAuthorDetails, { id } from "./useAuthorDetails";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";

export default function Timeline({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const { user, loading, error } = useAuthorDetails({ userId: post.userId });

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <div className="timeline">
      <div className="post-container">
        <div className="user-details">
          <div className="author-details">
            <Link to={`profile/${user._id}`}>
              <img
                src={
                  PF +
                  (user.profilePicture
                    ? user.profilePicture
                    : "users/default.png")
                }
                alt="profilePicture"
              />
            </Link>
            <span className="username">{user.username}</span>
            <span className="post-date">{format(post.createdAt)}</span>
          </div>
          <UnfoldMoreOutlinedIcon className="more-icon" />
        </div>
        <div className="body">
          <div className="post-content">{post.content}</div>
          {post.img ? <img src={PF + post.img} alt="welcome" /> : null}
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
              onClick={async () => {
                try {
                  const Client = new ClientAPI<id, never>(
                    `posts/${post._id}/like`
                  );
                  const res = await Client.likePost({ userId: user._id });
                  console.log(res);
                } catch (err) {
                  console.log(err);
                }
                setLikes(isLiked ? likes - 1 : likes + 1);
                setIsLiked(!isLiked);
              }}
            />
            <span className="like-counter">{likes} people like this</span>
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
