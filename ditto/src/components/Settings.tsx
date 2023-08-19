import React, { FC } from "react";

interface SettingsProps {
  level: string;
  intro: string;
  objectives: [];
}

const Settings: FC<SettingsProps> = ({}) => {
  return <div className="settings"></div>;
};


export default Settings;

/*
level name
introduction
objectives: 1. 2. 3.
options: beginner, intermediate, fluent
start
*/
