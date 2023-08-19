import React, { useState, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function SpeechToText() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isActive, setIsActive] = useState(false); // 0 = Playing, 1 = Paused (Resume), 2 = Start

  const microphoneRef = useRef<any>(null);
  const startIcon = "/images/icons/mic.svg";
  const endIcon = "/images/icons/mic-off.svg";

  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return (
  //     <div> Browser does not support speech recognition.</div>
  //   );
  // }
  const handleListing = () => {
    setIsActive(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
      language: 'zh-CN',
    });
  };
  const stopHandle = () => {
    setIsActive(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    console.log(transcript);
    console.log("WALKJSDKLAS")
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };


  return (
    <div className="stt w-8">
      <button className="input-button w-6" ref={microphoneRef} onClick={isActive ? stopHandle : handleListing}>
        <img src={isActive ? startIcon : endIcon }/>
      </button>

      {transcript && (
        <div>
          <div>{transcript}</div>
          <button onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeechToText;