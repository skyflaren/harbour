import React, { FC, useState, useRef, useEffect, use } from "react";
import ChatItem from "./ChatItem";
import { Message } from "ai";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { VercelHandleInputChange, VercelHandleSubmit } from "@/types";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { SubmitButton } from "./SubmitButton";

library.add(faPaperPlane);
  
interface ChatProps {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  handleInputChange: VercelHandleInputChange
  handleSubmit: VercelHandleSubmit
}

const Chat: FC<ChatProps> = ({ 
  messages, 
  input,
  setInput,
  handleInputChange,
  handleSubmit 
}) => {
  const [inputValue, setInputValue] = useState("");
  const scrollItemRef = useRef<HTMLDivElement | null>(null);

  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isActive, setIsActive] = useState(false); // 0 = Playing, 1 = Paused (Resume), 2 = Start

  const microphoneRef = useRef<any>(null);
  const startIcon = "/images/icons/mic.svg";
  const endIcon = "/images/icons/mic-off.svg";

  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitted");
    handleSubmit(e);
  }

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

  // Add an event listener that will submit the form when the user presses Enter.
  useEffect(
    function SubmitFormOnEnter(){
      const handleEnter = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          event.preventDefault();
          console.log("Enter pressed")

          // @ts-ignore
          const form = document.getElementById("chat-form");

          // @ts-ignore
          form.dispatchEvent(new Event("submit", { 
            "bubbles": true,
            "cancelable": true, 
          }));
        }
      };

      window.addEventListener("keydown", handleEnter);

      return () => {
        window.removeEventListener("keydown", handleEnter);
      };
    }, []
  )

  const handleListing = () => {
    // setInputValue(inputValue);
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
    setInput(input+transcript);
    setIsActive(false);
    resetTranscript();
  };

  return (
    <div className="chat">
      <div className="chat-wrapper">
        <h1>Chat</h1>
        <div className="chat-items">
          {messages.map((item) => (
            <ChatItem
              key={item.id}
              role={item.role}
              text={item.content}
            />
          ))}
          <div ref={scrollItemRef} className="scroll-item" />
        </div>
        <form id="chat-form" onSubmit={_handleSubmit}>
          <div className="input-bar flex flexrow">
            <input
              type="text"
              name="message"
              placeholder="Send a message..."
              value={input}
              onChange={handleInputChange}
            />
            <div className="stt w-8">
              <div className="input-button w-6" ref={microphoneRef} onClick={isActive ? stopHandle : handleListing}>
                <img src={isActive ? startIcon : endIcon }/>
              </div>
            </div>
            <SubmitButton />
          </div>
        </form>
        
      </div>
      <div className="menu">
        <p>settings</p>
      </div>
    </div>
  );
};

export default Chat;
