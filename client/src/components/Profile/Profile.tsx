import "./Profile.css";
import { Link, useParams } from "react-router-dom";
import useAuthorDetails from "../Timeline/useAuthorDetails";
import useFriends from "./useFriends";
import useAuth from "../Login/useAuth";
import { FormEvent, useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";

export default function Profile() {
  const userId = useParams();
  const currentUser = useAuth();
  const { user, loading, error } = useAuthorDetails({ userId: userId.id! });
  const { friends } = useFriends({ userId: userId.id! });
  const [followed, setFollowed] = useState(
    currentUser?.followings?.includes(userId.id!)
  );

  //bio edit
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(user.bio);
  const handleBioChange = async (event: FormEvent) => {
    event.preventDefault();
    const Client = new ClientAPI(`/users/${currentUser._id}`);
    await Client.updateProfile({ bio: newBio, userId: currentUser._id });
    user.bio = newBio;
    setIsEditing(false);
  };

  // handle follow
  const handleFollow = async () => {
    try {
      if (followed) {
        const res = new ClientAPI(`/users/${userId.id}/unfollow`);
        await res.unFollowUser({ userId: currentUser?._id });
        if (user?.followings && userId.id)
          user.followings = user?.followings.filter((id) => id !== userId.id);
      } else {
        const res = new ClientAPI(`/users/${userId.id}/follow`);
        await res.followUser({ userId: currentUser?._id });
        if (user?.followings && userId.id) user.followings.push(userId.id);
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFollowed(currentUser?.followings?.includes(userId.id!));
  }, [currentUser, userId.id]);

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
            <div className="user-bio">
              {currentUser?._id === userId.id && !isEditing && (
                <>
                  {user.bio}
                  <button
                    className="edit-bio-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                </>
              )}
              {isEditing && (
                <form className="bio-form" onSubmit={handleBioChange}>
                  <input
                    className="bio-input"
                    type="text"
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    onBlur={handleBioChange}
                  />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="user-activity">
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
        <div className="users-followers">
          {friends.length > 0 ? (
            friends.map((friend) => (
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
            ))
          ) : (
            <div>No followings</div>
          )}
        </div>
      </div>
    </div>
  );
}
