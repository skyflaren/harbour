import React, { FC } from "react";
import DropdownMenu from "./DropdownMenu";

interface SettingsProps {
  level: string;
  intro: string;
  objectives: string[];
}

const Settings: FC<SettingsProps> = (props) => {
  return (
    <div className="settings">
      <div className="content-wraper">
        <h1 className="title">{props.level}</h1>
        <p className="intro">{props.intro} 
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p className="objectives"><b>Objectives: </b>{props.objectives[0]}; {props.objectives[1]}; {props.objectives[2]}
        </p>
        <div className="language-select">
          <DropdownMenu options={["Beginner","Intermediate","Fluent"]}/>
        </div>
        <div className="difficulty-select">
          
        </div>
      </div>
      
    </div>
  )
};


export default Settings;

/*
level name
introduction
objectives: 1. 2. 3.
options: beginner, intermediate, fluent
start
*/
