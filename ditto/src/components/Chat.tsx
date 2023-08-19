import React, { FC, useState, useRef, useEffect, use } from "react";
import ChatItem from "./ChatItem";
import { Message } from "@/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

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

  const handleInputChange = (tv: React.ChangeEvent<HTMLInputElement>["target"]["value"]) => {
    setInputValue(tv);
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
  
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isActive, setIsActive] = useState(false); // 0 = Playing, 1 = Paused (Resume), 2 = Start

  const microphoneRef = useRef<any>(null);
  const startIcon = "/images/icons/mic.svg";
  const endIcon = "/images/icons/mic-off.svg";

  const handleListing = () => {
    setInputValue(inputValue);
    setIsActive(true);
    microphoneRef.current.classList.add("listening");
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: 'zh-CN',
    });
  };
  const stopHandle = () => {
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    
    console.log(transcript);
    handleInputChange(inputValue+transcript);
    setIsActive(false);
    resetTranscript();
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
        <div className="input-bar flex flexrow">
          <input
            type="text"
            name="message"
            placeholder="Send a message"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="stt w-8">
            <button className="input-button w-6" ref={microphoneRef} onClick={isActive ? stopHandle : handleListing}>
              <img src={isActive ? startIcon : endIcon }/>
            </button>
            {/* <button onClick={handleReset}>Reset</button> */}
          </div>
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
