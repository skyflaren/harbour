import React, { FC, useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import ChatItem from "./ChatItem";
import { Message } from "ai";

import { faAnchor, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Objective, VercelHandleInputChange, VercelHandleSubmit } from "@/types";

import { ChatInput } from "./ChatInput";
import { capitalize } from "@/utils/capitalize";
import { ObjectiveCard } from "./ObjectiveCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faPaperPlane);
  
interface ChatProps {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  handleInputChange: VercelHandleInputChange
  handleSubmit: VercelHandleSubmit,
  moduleTitle: string | undefined,
  moduleScenario: string | undefined,
  moduleObjectives: Objective[] | undefined,
  aiResponseLoading: boolean,
  lang: string,
  langCode: string,
}

const Chat: FC<ChatProps> = ({ 
  messages, 
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  moduleTitle,
  moduleScenario,
  moduleObjectives,
  aiResponseLoading,
  langCode,
}) => {
  const [inputValue, setInputValue] = useState("");
  const scrollItemRef = useRef<HTMLDivElement | null>(null);

  // console.log("OBJECTIVES", moduleObjectives)

  const scrollToBottom = () => {
    if (scrollItemRef.current) {
      scrollItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-full w-full bg-gray-100">

      <div className="relative w-2/3 h-full max-h-full px-20 py-11 flex flex-col">

        <div className="flex-none pb-10">
          <h1 className="font-title text-[40px] text-text">{moduleTitle ? capitalize(moduleTitle) : "Loading..."}</h1>
          <p className="text-md text-text">Scenario: {moduleScenario ?? "Loading scenario..."}</p>
        </div>

        <div className="flex-grow overflow-y-scroll custom-scrollbar">
          {messages.map((item, index) => {
            return (
            <ChatItem
              key={item.id}
              role={item.role}
              text={item.content}
              loading={(index === messages.length - 1) ? aiResponseLoading : false}
              langCode={langCode}
            />
            )
          })}
          <div ref={scrollItemRef} className="pb-10" />
        </div>

        <div className="flex-none">
        <ChatInput input={input} setInput={setInput} handleInputChange={handleInputChange} handleSubmit={handleSubmit} langCode={langCode}/>
        </div>
      </div>

      <div className="relative w-1/3 h-full bg-background p-20 overflow-y-scroll custom-scrollbar">
        <div className="flex flex-col"> 
          <div className="w-full flex flex-row gap-4 justify-end">
            <Link href="/">
              <div className="p-4 bg-gray-300 group group hover:bg-danger duration-200 font-title rounded cursor-pointer">
                  <FontAwesomeIcon
                    icon={faAnchor}
                    className="text-lg text-accent group-hover:text-[rgba(0,0,0,.5)] "
                  />
              </div>
            </Link>
          </div>
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-serif text-[20px] font-bold">Objectives</h2>
            {moduleObjectives && moduleObjectives.map((objective) => (
              <ObjectiveCard objective={objective.objective} answer={objective.answer ?? []} />
            ))}
          </div>
        </div>

        {/* <ObjectivePanel />  */}
      </div>
    </div>
  );
};

export default Chat;
