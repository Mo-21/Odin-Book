import "./ChatOnline.css";
export default function ChatOnline() {
  return (
    <div className="ChatOnline">
      <div className="chat-online-friends">
        <div className="chat-img-container">
          <div className="chat-online-marker"></div>
        </div>
      </div>
      <span className="chat-online-name"></span>
    </div>
  );
}
