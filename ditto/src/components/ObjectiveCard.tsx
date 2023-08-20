import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type ObjectiveCardProps = {
  objective: string;
  answer: string[];
}

export const ObjectiveCard = ({
  objective,
  answer
}: ObjectiveCardProps) => {

  const [ input, setInput ] = useState<string>("");
  const [ isCorrect, setIsCorrect ] = useState<boolean>(false);

  useEffect(() => {
    if (answer.some(ans => ans.toLocaleLowerCase() == input.toLocaleLowerCase())) {
      setIsCorrect(true);
    }
  }, [input])

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-fit px-4 py-6 rounded-md bg-secondary font-sans">
      <div className="w-full h-fit">
        <div className="flex flex-row items-center gap-2">
          <p className={"font-bold text-left"}> TO-DO </p>
          { isCorrect &&
            <FontAwesomeIcon
              icon={faCheck}
              className="text-lg text-accent"
            />
          }
        </div>
        <p className="w-full h-fit text-left text-md italic font-light text-black">
          {objective}
        </p>
      </div>

      <input
        type="text"
        className="w-full h-6 bg-tertiary outline-none p-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isCorrect}
      />
    </div>
  )
}