import { TextToSpeech, SpeechToText, Chat } from "@/components";
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
      text: "bonjour je suis un chat bot ceci est un exemple de message.",
      user: false,
    });
  };

  return (
    <div className="lesson1">
      <Chat messages={messages} dataChange={messagesChange} />
      <TextToSpeech text={String(messages.at(-1))} />
      <p>{String(messages.at(-1))}</p>
    </div>
  );
}
