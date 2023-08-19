import { TextToSpeech, Chat } from "@/components";
import { Message } from "@/types";

export default function Lesson1() {
  var messages: Message[] = [];
  const userImage = "/images/profiles/user.jpeg";
  const botImage = "/images/profiles/bot.jpeg";

  const messagesChange = () => {
    getBotResponse();
  };

  const getBotResponse = () => {
    messages.push({
      id: messages.length,
      image: botImage,
      name: "bot",
      text: "bot response",
      user: false,
    });
  };

  const text = "No library required To Build a Text-to-Speech component in React.";
  return (
    <div className="lesson1">
      <Chat messages={messages} dataChange={messagesChange} />
      <TextToSpeech text={String(messages.at(-1))} />
      <p>{String(messages.at(-1))}</p>
    </div>
  )
};
