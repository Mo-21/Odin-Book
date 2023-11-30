import profileImage from "../../assets/profile-picture.jpg";
import "./ChatOnline.css";
export default function ChatOnline() {
  return (
    <div className="ChatOnline">
      <div className="chat-online-friends">
        <div className="chat-img-container">
          <img
            className="chat-online-img"
            src={profileImage}
            alt="profileImage"
          />
          <div className="chat-online-marker"></div>
        </div>
      </div>
      <span className="chat-online-name">John Moe</span>
    </div>
  );
}
