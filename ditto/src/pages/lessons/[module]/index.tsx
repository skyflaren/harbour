import { useRouter } from "next/router";
import { useChat } from 'ai/react'
import { useState } from 'react';
import { useJson } from '@/hooks/useJson';
import { ModuleJSON } from "@/types";

const moduleList = [
  'food',
]

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
} 



export default function Page() {
  const router = useRouter();
  const moduleName = router.query.module as string;

  const getBody = () => {
    return {
      moduleName: moduleName,
    }
  }
  console.log("MODULE NAME", moduleName);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/openai/generate',
    body: getBody(),
  })

  const json = useJson(moduleName);

  if (!moduleList.includes(moduleName)) {
    return (
      <div>
        Sorry this module does not exist.
      </div>
    )
  }

  if (json.isLoading) {
    return <div>Loading...</div>
  }
  if (json.isError) {
    return <div>Error</div>
  }

  const module = json.data;
  console.log("MODULE", module);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center gap-4 m-8">
        <h1 className="text-6xl font-bold">
          {capitalize(moduleName)} Lesson
        </h1>
        <p className="text-sm"> Scenario: {module?.scenario} </p>
      </div>

      {messages.map(m => (
        <div key={m.id}>
          {m.role}: {m.content}
        </div>
      ))}

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

          {!isLoading ? (
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

      </div>
    </div>
         
  )
}