import React, { useEffect } from "react";

import { Chat } from "@/components";
import { Message } from "@/types";

export default function Lesson1() {
  var messages: Message[] = [];
  const userImage = "/images/profiles/user.jpeg";
  const botImage = "/images/profiles/bot.jpeg";

  var difficulty, language;

  const messagesChange = () => {
    getBotResponse();
  };

  const getBotResponse = () => {
    // TODO: add real api bot response
    messages.push({
      id: messages.length,
      image: botImage,
      name: "bot",
      text: "bonjour je suis un chat bot ceci est un exemple de message.",
      user: false,
    });
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    difficulty = urlSearchParams.get("difficulty");
    language = urlSearchParams.get("language");
    console.log(difficulty + " " + language);
  }, []);

  return (
    <div className="lesson1">
      <Chat messages={messages} dataChange={messagesChange} />
    </div>
  );
}
