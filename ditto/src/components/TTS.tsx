import React, { FC, useState, useEffect } from "react";

interface TTSProps {
  text: string;
}

const TextToSpeech: FC<TTSProps> = ({ text }) => {
  const [isPaused, setIsPaused] = useState(2); // 0 = Playing, 1 = Paused (Resume), 2 = Start
  const [utterance, setUtterance] = useState<any>(null);
  const playIcon = "/images/icons/play-circle.svg";
  const pauseIcon = "/images/icons/pause-circle.svg";

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused == 1) { // paused play
      synth.resume();
    }
    else if(isPaused == 2){ // new play
      synth.speak(utterance);
    }
    utterance.addEventListener("end", (event: SpeechSynthesisEvent) => {
      console.log("Done");
      setIsPaused(2);
    });
    setIsPaused(0);
    
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(1);
  };

  return (
    <div>
      <p>{isPaused==0 ? "Pause" : isPaused==1 ? "Resume" : "Play"}</p>
      <button onClick={isPaused == 0 ? handlePause : handlePlay}><img src={isPaused==0 ? pauseIcon : playIcon}></img></button>
    </div>
  );
};

export default TextToSpeech;