import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useChat } from 'ai/react'
import { useJson } from '@/hooks/useJson';

import { Chat } from "@/components";
import { codeToEngLang, natLangToCode } from "@/utils/lang";

const moduleList = ["directions", "restaurant", "clothing", "weather", "time", "sports", "hobbies", "hackathons"];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const langCode = (searchParams && searchParams.get('lang')) || "en-US";
  const lang = codeToEngLang.get(langCode) || "English";

  const moduleName = router.query.module as string;

  const getBody = () => {
    return {
      moduleName: moduleName,
      langCode: langCode
    };
  };
  // console.log("MODULE NAME", moduleName);

  const { messages, input, handleInputChange, setInput, handleSubmit, isLoading, append } = useChat({
    api: '/api/openai/generate',
    body: getBody(),
  });

  const json = useJson(moduleName);

  if (!moduleList.includes(moduleName)) {
    return <div>Sorry this module does not exist.</div>;
  }

  if (json.isLoading) {
    return <div>Loading...</div>;
  }
  if (json.isError) {
    return <div>Error</div>;
  }

  const module = json.data;
  // console.log("MODULE", module);

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
      aiResponseLoading={isLoading}
      lang={lang}
      langCode={langCode}
    />
  );
}
