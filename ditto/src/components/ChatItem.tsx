import React, { FC, useEffect, useRef, useState } from "react";
import axios from "axios";

interface ChatProps {
  image: string;
  name: string;
  text: string;
  user: boolean;
}

const ChatItem: FC<ChatProps> = ({ image, name, text, user }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [selected, setSelected] = useState<string>("");
  const textRef = useRef<HTMLDivElement | null>(null); // Add this ref

  const handleGlobalClick = (event: MouseEvent) => {
    if (textRef.current && !textRef.current.contains(event.target as Node)) {
      setSelected("");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const handleTextHighlight = () => {
    if (user) return;
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      console.log("Highlighted text:", selectedText);
      setSelected(selectedText);
    }
  };

  const getTranslation = async () => {
    if (user) return;
    try {
      const response = await axios.post("/api/translate/translate", {
        selected,
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`chat-item ${user ? "right" : "left"}`}>
      <div className="content-wrapper">
        <div
          className={`content ${user ? "flex-row-reverse" : ""}`}
          ref={contentRef}
          onMouseMove={handleTextHighlight}
        >
          <div className={`name ${user ? "text-right" : "text-left"}`}>
            {name}
          </div>
          <div className="text" ref={textRef}>
            {text}
          </div>
        </div>
        <div className={`image ${user ? "right" : "left"}`}>
          <img src={image} />
        </div>
      </div>
      <div className="translate">
        {selected != "" && (
          <button className="translateButton">
            Translate highlighted text
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
