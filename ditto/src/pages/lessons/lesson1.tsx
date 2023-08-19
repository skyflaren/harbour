import { Chat, Settings } from "@/components";
import { Message } from "@/types";

export default function Lesson1() {
  var messages: Message[] = [];
  const userImage = "/images/profiles/user.jpeg";
  const botImage = "/images/profiles/bot.jpeg";

  const messagesChange = () => {
    getBotResponse();
  };

  const getBotResponse = () => {
    // TODO: add real api bot response
    messages.push({
      id: messages.length,
      image: botImage,
      name: "bot",
      text: "bot response",
      user: false,
    });
  };

  return (
    <div className="lesson1">
      <Chat messages={messages} dataChange={messagesChange} />
      <Settings 
      level="Walking and Talking" 
      intro="Enter Bill and Bob's fruit kabob shop and talk with Bill" 
      objectives={["name of cat", "favourite fruit", "mother's name"]} />

    </div>
  );
}

