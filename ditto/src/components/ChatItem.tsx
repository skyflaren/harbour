import React, { FC } from "react";

interface ChatProps {
  image: string;
  name: string;
  text: string;
  user: boolean;
}

const ChatItem: FC<ChatProps> = ({ image, name, text, user }) => {
  return (
    <div className={`chat-item ${user ? "right" : "left"}`}>
      <div className={`image ${user ? "right" : "left"}`}>
        <img src={image} />
      </div>
      <div className={`content ${user ? "right" : "left"}`}>
        <div className="name">{name}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

export default ChatItem;
