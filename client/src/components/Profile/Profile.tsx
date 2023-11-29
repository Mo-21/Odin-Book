import "./Profile.css";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import { Link, useParams } from "react-router-dom";
import useAuthorDetails from "../Timeline/useAuthorDetails";
import useUserPosts from "./useUserPosts";
import useFriends from "./useFriends";
import useAuth from "../Login/useAuth";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";

export default function Profile() {
  const userId = useParams();
  const currentUser = useAuth();
  const { user, loading, error } = useAuthorDetails({ userId: userId.id! });
  const { timeline, isLoading, isError } = useUserPosts({ userId: userId.id! });
  const { friends } = useFriends({ userId: userId.id! });
  const [followed, setFollowed] = useState(
    currentUser?.followings?.includes(userId.id!)
  );
  //useEffect to handle follow status
  useEffect(() => {
    if (currentUser?.followings && userId?.id) {
      setFollowed(currentUser?.followings.includes(userId?.id));
    } else {
      setFollowed(true);
    }
  }, [currentUser, userId.id]);

  //handle follow
  const handleFollow = async () => {
    try {
      if (followed) {
        const res = new ClientAPI(`/users/${userId.id}/unfollow`);
        const data = await res.unFollowUser({ userId: currentUser?._id });
        if (currentUser?.followings && userId.id)
          currentUser.followings = currentUser?.followings.filter(
            (id) => id !== userId.id
          );
        console.log(data);
      } else {
        const res = new ClientAPI(`/users/${userId.id}/follow`);
        const data = await res.followUser({ userId: currentUser?._id });
        if (currentUser?.followings && userId.id)
          currentUser.followings.push(userId.id);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  console.log(`VisitorID:${userId.id}, UserID:${currentUser?._id}`);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <div className="profilePage-container">
      <div className="users-profile-info">
        <div className="cover-picture">
          <img
            className="cover-picture-img"
            src={
              PF + (user.coverPicture ? user.coverPicture : "users/welcome.jpg")
            }
            alt="coverPicture"
          />
        </div>
        <div className="user-personal-info">
          <div className="profile-picture-profile">
            <img
              className="profile-picture-img"
              src={
                PF +
                (user.profilePicture
                  ? user.profilePicture
                  : "users/default.png")
              }
              alt="profilePicture"
            />
          </div>
          <div className="user-info">
            <div className="user-name">{user.username}</div>
            <div className="user-bio">{user.bio}</div>
          </div>
        </div>
      </div>
      <div className="user-activity">
        <div className="user-activity-item">
          <div className="user-activity-item-count">{timeline.length}</div>
          <div className="user-activity-item-text">Posts</div>
        </div>
        <div className="user-activity-item">
          <div className="user-activity-item-count">
            {user.followers.length}
          </div>
          <div className="user-activity-item-text">Followers</div>
        </div>
        <div className="user-activity-item">
          <div className="user-activity-item-count">
            {user.followings.length}
          </div>
          <div className="user-activity-item-text">Following</div>
        </div>
      </div>
      <div className="users-profile-activity">
        <div className="user-posts">
          {!isLoading &&
            !isError &&
            timeline.length > 0 &&
            timeline.map((post) => {
              return (
                <div className="timeline">
                  <div className="post-container">
                    <div className="user-details">
                      <div className="author-details">
                        <img
                          src={
                            PF +
                            (user.profilePicture
                              ? user.profilePicture
                              : "users/default.png")
                          }
                          alt="profilePicture"
                        />
                        <span className="username">{user.username}</span>
                        <span className="post-date">
                          {format(post.createdAt)}
                        </span>
                      </div>
                      <UnfoldMoreOutlinedIcon className="more-icon" />
                    </div>
                    <div className="body">
                      <div className="post-content">{post.content}</div>
                      {post.img && <img src={PF + post.img} alt="welcome" />}
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
                          {post.likes.length ? post.likes.length : 0} people
                          like this
                        </span>
                      </div>
                      <div className="comments">
                        <span className="comment-counter">
                          {post.comments.toString()
                            ? post.comments.toString()
                            : 0}{" "}
                          comments
                        </span>
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="users-basic-info">
          {currentUser?._id !== userId.id &&
            (followed ? (
              <div className="follow">
                <button onClick={handleFollow} className="follow-btn">
                  Unfollow <span className="plus">-</span>
                </button>
              </div>
            ) : (
              <div className="follow">
                <button onClick={handleFollow} className="follow-btn">
                  Follow <span className="plus">+</span>
                </button>
              </div>
            ))}
          <div className="information">
            <div className="city">
              City:
              <span className="city-text">{user.city}</span>
            </div>
            <div className="from">
              From:
              <span className="from-text">{user.from}</span>
            </div>
            <div className="relationship">
              Relationship Status:
              <span className="relationship-text">{user.relationship}</span>
            </div>
          </div>
          <div
            style={{ textAlign: "center", fontSize: "1.4rem" }}
            className="users-followers"
          >
            Followings {friends.length}
            {friends.map((friend) => (
              <div key={friend._id} className="user-follower">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/profile/${friend._id}`}
                >
                  <div className="follower-picture">
                    <img src={PF + friend.profilePicture} alt="woman" />
                  </div>
                  <div className="follower-name">{friend.username}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
