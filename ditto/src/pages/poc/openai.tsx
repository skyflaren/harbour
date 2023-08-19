// Basic page with text input field and button to query backend API
import { fetchLLMResponse } from '@/utils/api/fetchLlmResponse';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setResponse('');
    setLoading(true);
    
    const data = await fetchLLMResponse(input)
      .catch((err) => {
        console.error(err);
        setResponse("Error: " + err);
        setLoading(false);
      });

    if (!data) {
      console.log("Failed to return content");
      return;
    }

    console.log(data);

    const reader = data.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      console.log("CHUNK", chunkValue);
      setResponse((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <h1 className="text-6xl font-bold m-12">
          OpenAI Playground
        </h1>
      </div>

      <div className="w-full max-w-xl">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          maxLength={200}
          className="focus:ring-neu w-full rounded-md border border-neutral-400
          p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900"
          placeholder={"Enter prompt here..."}
        />
        {!loading ? (
          <button
            className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80"
            onClick={(e) => generateResponse(e)}
          >
            Generate Response &rarr;
          </button>
        ) : (
          <button
            disabled
            className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
          >
            <div className="animate-pulse font-bold tracking-widest">...</div>
          </button>
        )}
        {response && (
          <div className="mt-8 rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100">
            {response}
          </div>
        )}
      </div>
    </div>
         
  )
}