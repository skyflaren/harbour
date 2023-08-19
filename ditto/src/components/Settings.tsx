import React, { FC, useState } from "react";
import DropdownMenu from "./DropdownMenu";

interface SettingsProps {
  level: string;
  intro: string;
  objectives: string[];
  onContinue: (difficulty: string, language: string) => void;
}

const Settings: FC<SettingsProps> = ({
  level,
  intro,
  objectives,
  onContinue,
}) => {
  const [difficulty, setDifficulty] = useState<string>("Beginner");
  const [language, setLanguage] = useState<string>("English");

  const handleContinue = () => {
    onContinue(difficulty, language);
  };

  return (
    <div className="settings">
      <div className="content-wraper">
        <h1 className="title">{level}</h1>
        <p className="intro">
          {intro}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p className="objectives">
          <b>Objectives: </b>
          {objectives[0]}; {objectives[1]}; {objectives[2]}
        </p>
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
        <div className="button">
          <button onClick={handleContinue}>Start Level</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
