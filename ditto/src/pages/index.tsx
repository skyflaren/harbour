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

  

  const regenHandle = () => {
    console.log("WOO")
    let newPrompt = lessons[Math.floor(Math.random() * lessons.length)]["name"];
    while(newPrompt === prompt){
      newPrompt = lessons[Math.floor(Math.random() * lessons.length)]["name"];
    }
    setPrompt(newPrompt);
  };

  return (
    <div className="home font-sans">
      <title>harbour</title>
      <div className="header-wrapper">
        <div className="header text-primary">
          <h1 className="font-title font-thin">harbour</h1>
        </div>
      </div>
      
      <div className="main-bar-wrapper">
        <div className="main-bar font-bold">
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
          
          <span className="text-gray-300 font-serif">Take me to the </span>

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
              disabled={true}
              onSelect={setPrompt}
            />
            <div className="regenPrompt bg-primary" onClick={regenHandle}></div>
          </form>

          <span className="text-gray-300 font-serif">to practice</span>

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
    </div>
  );
}
