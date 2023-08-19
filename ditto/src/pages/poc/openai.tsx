import { useState } from 'react';
import { fetchLLMResponse } from '@/utils/api/fetchLlmResponse';
import { useChat } from 'ai/react'


export default function Page() {
  const [loading, setLoading] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/openai/generate'
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <h1 className="text-6xl font-bold m-12">
          OpenAI Playground
        </h1>
      </div>

      <div className="w-full max-w-xl">
        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            maxLength={200}
            className="focus:ring-neu w-full rounded-md border border-neutral-400
            p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900"
            placeholder={"Enter prompt here..."}
          />

          {!loading ? (
            <button
              className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80"
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

        </form>

        {messages.map(m => (
          <div key={m.id}>
            {m.role}: {m.content}
          </div>
        ))}

      </div>
    </div>
         
  )
}