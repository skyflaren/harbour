import React, { use, useState, useEffect } from "react";
import Collapsible from "@/components/Collapsible";
import { Lesson } from "@/types";
import { Card, DropdownMenu } from "@/components";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("Randomize");
  const [difficulty, setDifficulty] = useState<string>("Randomize");
  const [language, setLanguage] = useState<string>("Randomize");

  var lessons: Lesson[] = [
    {
      id: 0,
      name: "Restaurant",
      desc: "asdc",
      image: "images/profiles/bot.jpeg",
      link: "lessons/lesson1",
    },
    {
      id: 1,
      name: "Bar",
      desc: "a",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson2",
    },
    {
      id: 2,
      name: "Airport",
      desc: "b",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson3",
    },
    {
      id: 3,
      name: "Karen",
      desc: "b",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson4",
    },
    {
      id: 4,
      name: "Toilet",
      desc: "b",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson5",
    },
    {
      id: 5,
      name: "Lamb Sauce",
      desc: "b",
      image: "images/profiles/bot.jpeg",
      link: "/lessons/lesson6",
    },
  ];

  var difficulties: string[] = ["beginner", "intermediate", "fluent"];
  var languages: string[] = ["English", "Chinese", "French", "Roseanna"];

  useEffect(() => {
    setPrompt(lessons[Math.floor(Math.random() * lessons.length)]["name"]);
    setDifficulty(difficulties[Math.floor(Math.random() * difficulties.length)]);
    setLanguage(languages[Math.floor(Math.random() * languages.length)]);
  }, []);

  return (
    <div className="home">
      <title>harbour</title>
      <div className="background-image"></div>
      <div className="header">
        <h1>harbour</h1>
      </div>

      <div className="main-bar bg-gray-800">
        {/* <div className="language-select">
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
        </div> */}
        
        <p>Take me to the </p>

        <form className="prompt-select">
          {/* <div className="card-grid">
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
          </div> */}
          <DropdownMenu
            options={lessons.map((item) => item.name)}
            value={prompt}
            onSelect={setPrompt}
          />
        </form>

        <p>to practice</p>

        <DropdownMenu
            options={difficulties}
            value={difficulty}
            onSelect={setDifficulty}
          />
          <DropdownMenu
            options={languages}
            value={language}
            onSelect={setLanguage}
          />

        {/* <div className="card-grid">
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
        </div> */}
      </div>

    </div>
  );
}
