import React, { FC, useEffect, useRef, useState } from "react";

interface ChatProps {
  image: string;
  name: string;
  text: string;
  user: boolean;
}

const ChatItem: FC<ChatProps> = ({ image, name, text, user }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [selected, setSelected] = useState<string>("");
  const textRef = useRef<HTMLDivElement | null>(null);
  const [translated, setTranslated] = useState<string>("");

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
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selected,
        }),
      });

      setTranslated(JSON.parse(await response.text()).message);
    } catch (error) {
      setTranslated("Sorry, there was an error translating.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={`chat-item ${user ? "right-user" : "left-user"}`}>
      <div className="content-wrapper">
        <div
          className="content"
          ref={contentRef}
          onMouseUp={handleTextHighlight}
        >
          <div className="name">{name}</div>
          <div className="text" ref={textRef}>
            {text}
          </div>
        </div>
        <div className="image">
          <img src={image} />
        </div>
      </div>
      <div className="translate">
        {selected != "" && (
          <button className="translateButton" onClick={getTranslation}>
            Translate highlighted text
          </button>
        )}
        {translated != "" && <p>{translated}</p>}
      </div>
    </div>
  );
};

export default ChatItem;
