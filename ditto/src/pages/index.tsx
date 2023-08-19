import React, { useState } from "react";
import Collapsible from "@/components/Collapsible";
import { Lesson } from "@/types";
import { Card, DropdownMenu } from "@/components";

export default function Home() {
  const [difficulty, setDifficulty] = useState<string>("Beginner");
  const [language, setLanguage] = useState<string>("English");

  var lessons: Lesson[] = [
    {
      id: 0,
      name: "?",
      desc: "asdc",
      image: "images/profiles/bot.jpeg",
      link: "lessons/lesson1",
    },
    {
      id: 1,
      name: "a",
      desc: "a",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson2",
    },
    {
      id: 2,
      name: "sdsds",
      desc: "b",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson3",
    },
    {
      id: 3,
      name: "sdsds",
      desc: "b",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson4",
    },
    {
      id: 4,
      name: "sdsds",
      desc: "b",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson5",
    },
    {
      id: 5,
      name: "sdsds",
      desc: "b",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson6",
    },
  ];

  return (
    <div className="home">
      <title>Parakeet</title>

      <div className="background-image"></div>
      <div className="content">
        <h1>Website Title</h1>
      </div>

      <div className="header">
        <h1>Parakeet</h1>
      </div>

      <Collapsible content="This is the content of the collapsible section." />

      <div className="language-select">
        <DropdownMenu
          title="Difficulty"
          options={["Beginner", "Intermediate", "Fluent"]}
          value={difficulty}
          onSelect={setDifficulty}
        />
        <DropdownMenu
          title="Language"
          options={["English", "Chinese", "French", "Roseanna"]}
          value={language}
          onSelect={setLanguage}
        />
      </div>

      <div className="card-grid">
        {lessons.map((item) => (
          <a
            href={`${item.link}?language=${language}&difficulty=${difficulty}`}
          >
            <Card
              key={item.id}
              image={item.image}
              name={item.name}
              desc={item.desc}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
