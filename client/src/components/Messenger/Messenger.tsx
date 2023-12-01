import { useEffect, useRef, useState } from "react";
import ChatOnline from "../ChatOnline/ChatOnline";
import Conversation from "../Conversation/Conversation";
import useAuth from "../Login/useAuth";
import Message from "../Messege/Message";
import Topbar from "../Topbar/Topbar";
import "./Messenger.css";
import ClientAPI from "../ClientAPI";
import { io } from "socket.io-client";

export interface ConversationResponse {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

interface Sender {
  _id: string;
  username: string;
  profilePicture: string;
}

export interface MessageResponse {
  _id: string;
  conversationId: string;
  sender: Sender;
  text: string;
  createdAt: number;
}

export interface MessageRequest {
  conversationId: string;
  sender: string;
  text: string;
}

export default function Messenger() {
  const [conversations, setConversations] = useState<ConversationResponse[]>(
    []
  );
  const [messages, setMessages] = useState<MessageResponse[]>();
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<MessageResponse | null>(
    null
  );
  const [currentChat, setCurrentChat] = useState<ConversationResponse>();
  const socket = useRef(io("ws://localhost:4000"));
  const currentUser = useAuth();

  //socket configuration
  useEffect(() => {
    socket.current = io("ws://localhost:4000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: {
          _id: data.senderId,
          username: data.username,
          profilePicture: data.profilePicture,
        },
        _id: data._id,
        conversationId: data.conversationId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender._id) &&
      setMessages((prev) => [...(prev || []), arrivalMessage]);
  }, [arrivalMessage, currentChat?.members]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      return console.log(users);
    });
  }, [currentUser]);

  useEffect(() => {
    const Client = new ClientAPI<never, MessageResponse[]>(
      `/messages/${currentChat?._id}`
    );
    const getConversation = async () => {
      try {
        const response = await Client.getMessages();
        setMessages(response);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [currentChat?._id]);

  useEffect(() => {
    const Client = new ClientAPI<never, ConversationResponse[]>(
      `/conversations/${currentUser._id}`
    );
    const getConversation = async () => {
      try {
        const response = await Client.getConversation();
        setConversations(response);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [currentUser._id]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="messenger-menu">
          <div className="chat-menu-wrapper">
            <div className="chat-header">Chat</div>
            {conversations?.map((conversation) => (
              <div
                onClick={() => {
                  setCurrentChat(conversation);
                }}
              >
                <Conversation
                  conversation={conversation}
                  currentUser={currentUser}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="messenger-box">
          <div className="chat-box-wrapper">
            {currentChat ? (
              <>
                <div className="chat-box-top">
                  {messages?.map((message) => (
                    <Message
                      message={message}
                      own={
                        message.sender._id === currentUser._id ||
                        //@ts-ignore
                        message.sender === currentUser._id
                      }
                    />
                  ))}
                </div>
                <div className="chat-box-bottom">
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    className="chat-message-input"
                    placeholder="Write something..."
                  ></textarea>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      const Client = new ClientAPI<
                        MessageRequest,
                        MessageResponse
                      >(`/messages`);
                      const receiverId = currentChat.members.find(
                        (member) => member !== currentUser._id
                      );

                      socket.current.emit("sendMessage", {
                        senderId: currentUser._id,
                        receiverId,
                        text: newMessage,
                      });
                      try {
                        const response = await Client.sendMessage({
                          conversationId: currentChat._id,
                          sender: currentUser._id,
                          text: newMessage,
                        });
                        setMessages([...(messages || []), response]);
                        setNewMessage("");
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                    className="chat-submit-button"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="alternative-text">
                Choose a conversation to chat
              </span>
            )}
          </div>
        </div>
        <div className="messenger-online">
          <div className="chat-online-wrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
