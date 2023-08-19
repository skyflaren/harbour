// Basic page with text input field and button to query backend API
import { fetchLLMResponse } from '@/api/fetchLLMResponse';
import { useState } from 'react';

export default function Page() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    console.log("SENDING", prompt)
    const gptResponse = await fetchLLMResponse(prompt);

    console.log(gptResponse);

    setResponse(gptResponse.choices[0].message.content ?? "Failed to return content");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <h1 className="text-6xl font-bold m-12">
          OpenAI Playground
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <input 
          type="textArea" 
          placeholder="Enter prompt here" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          className={"text-black outline-none"}
        />
        <button className={"bg-slate-300 rounded p-2"} onClick={() => handleClick()}>Submit</button>

        {/* Prompt response from api */}
        <p className="text-white">
          {response}
        </p>
      </div>
    </div>
         
  )
}