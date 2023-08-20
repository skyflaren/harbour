import React, { FC, useState, useRef, useEffect, use } from "react";
import { VercelHandleInputChange, VercelHandleSubmit } from "@/types";
import { SubmitButton } from "./SubmitButton";

import { ChatSTT } from "./ChatSTT";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleInputChange: VercelHandleInputChange;
  handleSubmit: VercelHandleSubmit;
  langCode: string;
}

export const ChatInput = ({
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  langCode,
}: ChatInputProps) => {

  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitted");
    handleSubmit(e);
  }

  // Add an event listener that will submit the form when the user presses Enter.
  useEffect(
    function SubmitFormOnEnter(){
      const handleEnter = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          event.preventDefault();
          console.log("Enter pressed")

          // @ts-ignore
          const form = document.getElementById("chat-form");

          // @ts-ignore
          form.dispatchEvent(new Event("submit", { 
            "bubbles": true,
            "cancelable": true, 
          }));
        }
      };

      window.addEventListener("keydown", handleEnter);

      return () => {
        window.removeEventListener("keydown", handleEnter);
      };
    }, []
  )

  return (
    <div className="h-[80px] w-full flex items-center justify-center">
      <form 
        id="chat-form" 
        className="relative flex-row w-full" 
        onSubmit={_handleSubmit}
      >
        {/* This div represents a fake input bar */}
        <div className="h-[60px] bg-background flex flex-row justify-end px-2 rounded">
          <input
            type="text"
            name="message"
            placeholder="Send a message..."
            value={input}
            onChange={handleInputChange}
            className="border-none outline-none flex-grow bg-background"
          />
          <div className="flex-none flex items-center justify-center p-1">
            <ChatSTT input={input} setInput={setInput} langCode={langCode}/>
          </div>
          <div className="flex-none flex items-center justify-center p-1">
            <SubmitButton />
          </div>
        </div>
          
          {/* </input> */}
      </form>
    </div>
  )
}