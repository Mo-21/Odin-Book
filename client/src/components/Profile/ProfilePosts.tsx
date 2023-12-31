import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useEffect, useRef, useState } from "react";
import ClientAPI from "../ClientAPI";
import useAuth from "../Login/useAuth";
import useAuthorDetails, { id } from "../Timeline/useAuthorDetails";
import {
  CommentRequest,
  CommentResponse,
  PostResponse,
} from "../Timeline/useTimeline";
import { NewPost } from "../PostInput/Post";

export default function ProfilePosts({ post }: { post: PostResponse }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const commentRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const { user, loading, error } = useAuthorDetails({ userId: post.userId });

  const currentUser = useAuth();

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
          <div className="action-buttons-userProfile">
            {post.userId === currentUser._id && !isEditing && (
              <button className="edit-post" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
            {post.userId === currentUser._id && (
              <button
                className="delete-post"
                onClick={async () => {
                  try {
                    const Client = new ClientAPI<id, never>(
                      `/posts/${post._id}/delete`
                    );
                    await Client.deletePost({ userId: currentUser._id });
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Delete
              </button>
            )}
          </div>
          {isEditing && (
            <form
              className="edit-post-form"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const Client = new ClientAPI<NewPost, PostResponse>(
                    `/posts/${post._id}`
                  );
                  await Client.updatePost({
                    userId: currentUser._id,
                    content: editedContent,
                  });
                  setIsEditing(false);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              <input
                type="text"
                required
                maxLength={1000}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          )}
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
              {post.comments.length > 0 ? post.comments.length : 0} comments
            </span>
            <hr />
          </div>
        </div>
        <div className="comment-action">
          {post.comments &&
            post.comments.map((comment) => {
              return (
                <div key={comment._id} className="comment">
                  <div className="comment-author">
                    <img
                      src={PF + comment.userId.profilePicture}
                      className="comment-author-img"
                      alt="profilePicture"
                    />
                    <span className="comment-username">
                      {comment.userId?.username}
                    </span>
                    {post.userId === currentUser._id ||
                    currentUser._id === user._id ||
                    comment.userId._id === currentUser._id ? (
                      <div className="delete-comment">
                        <button
                          onClick={async (e) => {
                            e.preventDefault();

                            try {
                              const Client = new ClientAPI<
                                CommentRequest,
                                never
                              >(`comments/${comment._id}`);
                              const res = await Client.deleteComment({
                                userId: currentUser._id,
                                content: comment.content,
                                postId: post._id,
                              });
                              console.log(res);
                            } catch (err) {
                              console.log(err);
                            }
                          }}
                          className="delete-comment-btn"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="comment-content">{comment.content}</div>
                </div>
              );
            })}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const Client = new ClientAPI<CommentRequest, CommentResponse>(
                  `/comments`
                );
                if (!commentRef.current?.value) return;
                await Client.commentPost({
                  userId: currentUser._id,
                  content: commentRef.current!.value,
                  postId: post._id,
                });
              } catch (err) {
                console.log(err);
              }
              commentRef.current!.value = "";
            }}
            className="send-comment"
          >
            <input
              className="comment-input"
              type="text"
              placeholder="Comment"
              ref={commentRef}
            />
            <button type="submit" className="submit-comment">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
