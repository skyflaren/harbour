import React, { useState } from "react";
import "./main_menu.css";
import Collapsible from "@/components/Collapsible";

export default function Home(){

  const handleClick = () => {
    alert('Button clicked');
  };

  return (
    <div className="home"> 
      <title>Parakeet</title>

      <div className="background-image"></div>
      <div className="content">
        <h1>Website Title</h1>
      </div>

      <Collapsible className="Collapsible Section">
        <p>This is the content of the collapsible section.</p>
      </Collapsible>

      <div className="header">
        <h1>Parakeet</h1>
      </div>

      <button onClick={handleClick} type="button" className="collapsible">Open Section 1</button>
      <div className="content">
        <p>ksdjflkjalskdjlaskdfjlasdkjflaksdjflakdjsflakjsdfaksdjf</p>
      </div>
      
    </div> 
  );
};