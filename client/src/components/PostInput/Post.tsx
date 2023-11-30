import "./Post.css";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import useAuth from "../Login/useAuth";
import { useRef, useState } from "react";
import axios from "axios";
import { PostResponse } from "../Timeline/useTimeline";
import ClientAPI from "../ClientAPI";
import { Cancel } from "@mui/icons-material";

export interface NewPost {
  userId: string;
  content: string;
  img?: string;
}

export default function Post() {
  const status = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const user = useAuth();

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  const Client = new ClientAPI<NewPost, PostResponse>("/posts/");

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setFile(null);
    if (
      !user ||
      status.current?.value === null ||
      status.current?.value === undefined
    )
      return console.log("User not logged in", user);
    const newPost: NewPost = {
      userId: user?._id,
      content: status.current?.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await Client.sharePost(newPost);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post-input">
      <div className="share-input">
        <img
          className="share-profile-img"
          src={
            PF +
            (user?.profilePicture ? user.profilePicture : "users/default.png")
          }
          alt="profilePicture"
        />
        <input
          ref={status}
          type="text"
          required
          maxLength={1000}
          className="share-input-text"
          placeholder={`Express yourself ${user?.username}, don't be shy.`}
        />
        {file && (
          <div className="share-img-container">
            <img
              className="share-img"
              src={URL.createObjectURL(file)}
              alt="post-image"
            />
            <Cancel
              className="share-cancel-img"
              onClick={() => setFile(null)}
            />
          </div>
        )}
      </div>
      <form onSubmit={handleFormSubmission} className="post-actions">
        <div className="media">
          <label htmlFor="file" className="media-text">
            <PermMediaOutlinedIcon className="action-icon" />
            Media
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              accept=".png,.jpg,.jpeg,.svg"
              onChange={(event) => {
                if (
                  event.target.files === null ||
                  event.target.files[0] === null
                )
                  return;
                setFile(event.target?.files[0]);
              }}
            />
          </label>
        </div>
        <div
          onClick={() => {
            if (status && status.current) {
              if (status.current.value === null) {
                status.current.value = "#";
              } else {
                status.current.value += "#";
              }
              status.current.focus();
            }
          }}
          className="hashtag"
        >
          <TagOutlinedIcon className="action-icon" />
          <span className="hashtag-text">Hashtag</span>
        </div>
        <div
          onClick={() => {
            if (status && status.current) {
              if (status.current.value === null) {
                status.current.value = "@";
              } else {
                status.current.value += "@";
              }
              status.current.focus();
            }
          }}
          className="mention"
        >
          <AlternateEmailOutlinedIcon className="action-icon" />
          <span className="mention-text">Mention</span>
        </div>
        <div className="location">
          <AddLocationAltOutlinedIcon className="action-icon" />
          <span className="location-text">Location</span>
        </div>
        <div className="submit-btn">
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
}
