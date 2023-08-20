import { Message as VercelChatMessage, OpenAIStream, StreamingTextResponse } from 'ai';

import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';
import { fetchJson } from '@/utils/api/fetchJson';

import { codeToEngLang } from '@/utils/lang';
 
export const runtime = 'edge'


/**
   * Basic memory formatter that stringifies and passes
   * message history directly into the model.
   */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`
}

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const body = await req.json();
  const messages = body.messages ?? [] as VercelChatMessage[];
  const { moduleName, langCode } = body;

  console.log("I GOT THIS CODE", langCode);

  const language = codeToEngLang.get(langCode) || 'English';

  // Get the module content from the JSON file
  const moduleContent = await fetchJson(moduleName);

  const { character_prompt } = moduleContent;

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
  const currentMessageContent = messages[messages.length - 1].content

  const TEMPLATE = `${character_prompt}

  Current conversation:
  {chat_history}

  User: {input}
  AI:`
 
  const prompt = PromptTemplate.fromTemplate(TEMPLATE)

  // See a full list of supported models at: https://js.langchain.com/docs/modules/model_io/models/
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxTokens: 1000,
    streaming: true,
    n: 1,
  })

  const outputParser = new BytesOutputParser()
 
  const chain = prompt.pipe(model).pipe(outputParser)
 
  const stream = await chain.stream({
    language: language, // This parameter exists inside character prompt which is parsed into the template, will this work? I don't know
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent
  })
 
  // Respond with the stream
  return new StreamingTextResponse(stream)
}