import React, { use, useState, useEffect } from "react";
import { Card, DropdownMenu } from "@/components";
import Link from "next/link";
import { natLangToCode } from "@/utils/lang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSailboat } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";


const lessons = [
  {
    setting:"Store",
    module: "clothing",
  },
  {
    setting:"Street",
    module: "directions",
  },
  {
    setting: "Tech Conference",
    module: "hackathons",
  },
  {
    setting:"Park",
    module: "hobbies",
  },
  {
    setting: "Restaurant",
    module: "restaurant",
  },
  {
    setting: "Sports Bar",
    module: "sports",
  },
  {
    setting: "Airport",
    module: "time",
  },
  {
    setting: "National Park",
    module: "weather",
  },
];

const languages = Array.from(natLangToCode.keys());

const difficulties: string[] = ["beginner", "intermediate", "fluent"];

export default function Home() {
  const [prompt, setPrompt] = useState<string>("Randomize");
  const [difficulty, setDifficulty] = useState<string>("Randomize");
  const [language, setLanguage] = useState<string>("Randomize");

  const [selectedModuleName, setSelectedModuleName] = useState<string>("");

  


  useEffect(() => {
    setPrompt(lessons[Math.floor(Math.random() * lessons.length)]["setting"]);
    setDifficulty(difficulties[Math.floor(Math.random() * difficulties.length)]);
    setLanguage(languages[Math.floor(Math.random() * languages.length)]);
  }, []);

  useEffect(() => {
    // Look up in lessons to see if an object has a matching setting to the value in prompt
    // If so, set selectedModuleName to the module value of that object
    lessons.forEach((item) => {
      if (item.setting === prompt) {
        setSelectedModuleName(item.module);
      }
    });
  }, [prompt])


  const regenHandle = () => {
    console.log("WOO")
    let newPrompt = lessons[Math.floor(Math.random() * lessons.length)]["setting"];
    while(newPrompt === prompt){
      newPrompt = lessons[Math.floor(Math.random() * lessons.length)]["setting"];
    }
    setPrompt(newPrompt);
  };

  return (
    <div className="home font-sans">
      <title>harbour</title>
      <div className="header text-primary flex flex-col justify-end">

          {/* <h1 className="font-title font-thin">harbour</h1> */}
        
        <div className="main-bar-wrapper  ">
          <div className="bg-[rgba(0,0,0,0.8)] py-6 px-10 rounded-3xl">
            <div className="main-bar font-bold ">
              
              <span className="text-gray-300 font-serif">Take me to the </span>

              <form className="prompt-select">
                <DropdownMenu
                  name={"setting"}
                  options={lessons.map((item) => item.setting)}
                  value={prompt}
                  disabled={true}
                  onSelect={setPrompt}
                />
                <div className="regenPrompt bg-primary" onClick={regenHandle}></div>
              </form>

              <span className="text-gray-300 font-serif">to practice</span>

              <DropdownMenu
                name={"difficulty"}
                options={difficulties}
                value={difficulty}
                onSelect={setDifficulty}
              />
              <DropdownMenu
                name={"language"}
                options={languages}
                value={language}
                onSelect={setLanguage}
              />
            </div>
            {/* Fake form button that uses state to update url */}
            {selectedModuleName && 
            <Link href={`/lessons/${selectedModuleName}?lang=${natLangToCode.get(language)}`}>
              <div className="text-white bg-primary flex flex-row gap-2 px-4 py-3 rounded text-xl items-center justify-center">
                <p> Ahoy! </p>
                <FontAwesomeIcon
                  icon={faSailboat}
                  className="text-lg text-white cursor-pointer"
                />
              </div>
            </Link>
            }
          </div>
        </div>
          
        

        <div className="footer-wrapper">
          <div className="footer">
            <span className="text-gray-600">Made with ♡ during Hackthe6ix 2023 by Justin, Kenneth, Nicole & Roseanna</span>
            {/* <FontAwesomeIcon
              icon={faGithub}
              className="text-lg text-accent group-hover:text-[rgba(255,255,255,.25)] "
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
