import { Chat } from "@/components";
import { Message } from "@/types";

export default function Lesson1() {
  var messages: Message[] = [
    {
      image: "/images/profiles/user.jpeg",
      name: "bot",
      text: "Hello I am a bot. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      ",
      user: false,
    },
    {
      image: "/images/profiles/user.jpeg",
      name: "bot",
      text: "Hello I am a bot. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      ",
      user: false,
    },
    {
      image: "/images/profiles/user.jpeg",
      name: "bot",
      text: "Hello I am a bot. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      ",
      user: false,
    },
    {
      image: "/images/profiles/user.jpeg",
      name: "bot",
      text: "Hello I am a bot. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      ",
      user: false,
    },
    {
      image: "/images/profiles/user.jpeg",
      name: "you",
      text: "hi im me",
      user: true,
    },
  ];
  return (
    <div className="lesson1">
      <Chat messages={messages} />
    </div>
  );
}
