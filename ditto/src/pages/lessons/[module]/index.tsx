import { useRouter } from "next/router";
import { useChat } from 'ai/react'
import { useState, useEffect } from 'react';
import { useJson } from '@/hooks/useJson';
import { v4 as uuidv4 } from 'uuid';

import { Chat } from '@/components';

const moduleList = [
  'food',
]

export default function Page() {
  const router = useRouter();
  const moduleName = router.query.module as string;

  const getBody = () => {
    return {
      moduleName: moduleName,
    }
  }
  console.log("MODULE NAME", moduleName);

  const { messages, input, handleInputChange, setInput, handleSubmit, isLoading, append } = useChat({
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
    <Chat 
      messages={messages} 
      input={input} 
      setInput={setInput}
      handleInputChange={handleInputChange} 
      handleSubmit={handleSubmit}
      moduleTitle={module?.module}
      moduleScenario={module?.scenario}
      moduleObjectives={module?.objectives}
    />
  )
}