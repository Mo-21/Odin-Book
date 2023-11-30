import useAuth from "../Login/useAuth";
import { MessageResponse } from "../Messenger/Messenger";
import "./Message.css";
import { format } from "timeago.js";

interface MessageProps {
  message: MessageResponse;
  own: boolean;
}

export default function Message({ message, own }: MessageProps) {
  const currentUser = useAuth();
  console.log(message);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        <img
          className="message-img"
          src={
            message.sender._id === currentUser._id
              ? currentUser.profilePicture
                ? PF + currentUser.profilePicture
                : PF + "users/default.png"
              : message.sender.profilePicture
              ? PF + message.sender.profilePicture
              : PF + "users/default.png"
          }
          alt="profile-picture"
        />
        <p className="message-text">{message.text}</p>
      </div>
      <div className="message-bottom">{format(message.createdAt)}</div>
    </div>
  );
}
