import React, { useState } from "react";

import { Chat, Settings } from "@/components";
import { Message } from "@/types";

export default function Lesson1() {
  var messages: Message[] = [];
  const userImage = "/images/profiles/user.jpeg";
  const botImage = "/images/profiles/bot.jpeg";
  const [settings, setSettings] = useState<boolean>(true);

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

  const continueLevel = (difficulty: string, language: string) => {
    console.log(difficulty + " " + language); // TODO: implement later
    setSettings(false);
  };

  return (
    <div className="lesson1">
      {settings && (
        <Settings
          level="Walking and Talking"
          intro="Enter Bill and Bob's fruit kabob shop and talk with Bill"
          objectives={["name of cat", "favourite fruit", "mother's name"]}
          onContinue={continueLevel}
        />
      )}
      {!settings && <Chat messages={messages} dataChange={messagesChange} />}
    </div>
  );
}
