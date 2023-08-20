import React, { FC, useEffect, useRef, useState } from "react";
import { TextToSpeech } from "./TTS";

interface ChatProps {
  role: string;
  text: string;
  loading: boolean;
  langCode: string;
}

const ChatItem: FC<ChatProps> = ({ 
  role,
  text,
  loading,
  langCode,
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [selected, setSelected] = useState<string>("");
  const textRef = useRef<HTMLDivElement | null>(null);
  const [translated, setTranslated] = useState<string>("");

  const isUser = role === "user";

  // console.log("text", text, "loading?", loading)

  const imageSrc = new Map<string, string>([
    ["user", "/images/profiles/user-pfp.png"],
    ["assistant", "/images/profiles/assistant-pfp.png"],
    ["system", "/images/profiles/system.jpeg"],
    ["function", "/images/profiles/function.jpeg"] // This doesn't have an image right now
  ]);

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
    if (isUser) return;
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      setTranslated("");
      console.log("Highlighted text:", selectedText);
      setSelected(selectedText);
    }
  };

  const getTranslation = async () => {
    if (isUser) return;
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selected,
          langCode,
        }),
      });

      setTranslated(JSON.parse(await response.text()).message);
    } catch (error) {
      setTranslated("Sorry, there was an error translating.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={`flex flex-col align-bottom gap-2 relative py-2 w-full`}>
      <div className="block">
        <div
          className="w-full flex flex-row gap-4"
          ref={contentRef}
          onMouseUp={handleTextHighlight}
        >
          <div className="self-end w-8 h-8">
            <img className="rounded-full" src={imageSrc.get(role)} />
          </div>

          <div className="inline-block w-auto max-w-lg bg-gray-200 px-5 py-2 rounded-md" ref={textRef}>
            {text}
          </div>
          {!loading && (
            <div className="self-center">
              <TextToSpeech text={text} langCode={langCode}/>
            </div>
          )}
        </div>
      </div>

      <div className="ml-16 w-96 text-sm text-left">
        {selected != "" && (
          <button className="h-4 text-sm text-accent" onClick={getTranslation}>
            Translate highlighted text
          </button>
        )}
        {translated != "" && <p>{translated}</p>}
      </div>
    </div>

  );
};

export default ChatItem;
