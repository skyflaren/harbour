import React, { FC, useState, useRef, useEffect, use } from "react";
import ChatItem from "./ChatItem";
import { Message } from "@/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPaperPlane);

interface ChatProps {
  messages: Message[];
  dataChange: () => void;
}

const Chat: FC<ChatProps> = ({ messages, dataChange }) => {
  useEffect(() => {
    scrollToBottom();
  });

  const [inputValue, setInputValue] = useState("");
  const scrollItemRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    sendMessage();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      messages.push({
        id: messages.length,
        image: "/images/profiles/user.jpeg",
        name: "you",
        text: inputValue,
        user: true,
      });
      scrollToBottom();
      setInputValue("");
      dataChange();
    }
  };

  const scrollToBottom = () => {
    if (scrollItemRef.current) {
      scrollItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-wrapper">
        <h1>Chat</h1>
        <div className="chat-items">
          {messages.map((item) => (
            <ChatItem
              key={item.id}
              image={item.image}
              name={item.name}
              text={item.text}
              user={item.user}
            />
          ))}
          <div ref={scrollItemRef} className="scroll-item" />
        </div>
        <div className="input-bar">
          <input
            type="text"
            name="message"
            placeholder="Send a message"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="input-button" onClick={handleSendClick}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-gray-500 ml-2 cursor-pointer"
            />
          </button>
        </div>
      </div>
      <div className="menu">
        <p>settings</p>
      </div>
    </div>
  );
};

export default Chat;
