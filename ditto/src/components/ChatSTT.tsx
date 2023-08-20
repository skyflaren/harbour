import React, { FC, useState, useRef, useEffect, use } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";

type ChatSTTProps = {
  input: string;
  setInput: (input: string) => void;
  langCode: string;
}

export const ChatSTT = ({
  input,
  setInput,
  langCode,
}: ChatSTTProps) => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const [isActive, setIsActive] = useState(false); // 0 = Playing, 1 = Paused (Resume), 2 = Start

  const microphoneRef = useRef<any>(null);

  const handleListening = () => {
    // setInputValue(inputValue);
    setIsActive(true);
    microphoneRef.current.classList.add("listening");
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: langCode,
    });
  };

  const stopHandle = () => {
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    
    // console.log(transcript);
    setInput(input+transcript);
    setIsActive(false);
    resetTranscript();
  };

  return (
    <div 
    ref={microphoneRef} 
    onClick={isActive ? stopHandle : handleListening}
    className="w-8 flex items-center justify-center"
    >
      {isActive ? (
        <FontAwesomeIcon
          icon={faMicrophone}
          className="text-lg text-accent cursor-pointer"
        />
      ) : (
        <FontAwesomeIcon
          icon={faMicrophoneSlash}
          className="text-lg text-accent cursor-pointer"
        />
      )}
    </div>
  )
};