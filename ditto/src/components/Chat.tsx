import React, { FC } from "react";
import ChatItem from "./ChatItem";
import { Message } from "@/types";

interface ChatProps {
  messages: Message[];
}

const Chat: FC<ChatProps> = ({ messages }) => {
  return (
    <div className="chat">
      <div className="chat-wrapper">
        <h1>Chat</h1>
        <div className="chat-items">
          {messages.map((item) => (
            <ChatItem
              image={item.image}
              name={item.name}
              text={item.text}
              user={item.user}
            />
          ))}
        </div>
        <div className="input-bar">
          <input type="text" name="message" value="Send a message" />
        </div>
      </div>
      <div className="menu">
        <p>settings</p>
      </div>
    </div>
  );
};

export default Chat;
