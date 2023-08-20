import React, { FC, useState, useEffect } from "react";

interface TTSProps {
  text: string;
  langCode: string;
}

export const TextToSpeech: FC<TTSProps> = ({ 
  text,
  langCode, 
}) => {
  // const [isPaused, setIsPaused] = useState(2); // 0 = Playing, 1 = Paused (Resume), 2 = Start
  // const [utterance, setUtterance] = useState<any>(null);
  const playIcon = "/images/icons/play-circle.svg";
  const pauseIcon = "/images/icons/pause-circle.svg";

  const [isPlaying, setIsPlaying] = useState(false);
  // const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  console.log("I HAVE TEXT", text, "AND LANGCODE", langCode)

  const toggleSpeech = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const newSpeech = new SpeechSynthesisUtterance(text);
      newSpeech.lang = langCode;
      newSpeech.onend = () => setIsPlaying(false);
      speechSynthesis.cancel();
      speechSynthesis.speak(newSpeech);
      // setSpeech(newSpeech);
      setIsPlaying(true);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (speech) {
  //       speechSynthesis.cancel();
  //     }
  //   };
  // }, [speech]);



  return (
    <div>
      {/* <p>{isPaused==0 ? "Pause" : isPaused==1 ? "Resume" : "Play"}</p> */}
      <button onClick={toggleSpeech}><img src={isPlaying ? pauseIcon : playIcon}></img></button>
    </div>
  );
};
