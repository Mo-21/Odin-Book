import "./Conversation.css";
import { useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";
import { ConversationResponse } from "../Messenger/Messenger";
import { User } from "../Timeline/useAuthorDetails";

interface ConversationProps {
  conversation: ConversationResponse;
  currentUser: User;
}

export default function Conversation({
  conversation,
  currentUser,
}: ConversationProps) {
  const [user, setUser] = useState<User | null>(null);

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      const Client = new ClientAPI<never, User>(`/users/${friendId}`);
      try {
        const response = await Client.getUser();
        setUser(response);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        className="conversation-profileImage"
        src={PF + (user?.profilePicture ? user.profilePicture : "/default.png")}
        alt="profileImage"
      />
      <span className="conversation-user">{user?.username}</span>
    </div>
  );
}
