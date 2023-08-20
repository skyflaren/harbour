import OpenAI from "openai";

export interface Message {
  id: number;
  image: string;
  name: string;
  text: string;
  user: boolean;
}

export type MessageResponse = {
  message: string;
}

export type ChatCompletion = OpenAI.Chat.ChatCompletion;

export interface Lesson {
  id: number;
  image: string;
  name: string;
  desc: string;
  link: string;
}

export type ChatCompletionChunk = OpenAI.Chat.ChatCompletionChunk;

export type ChatGPTAgent = "user" | "system";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

export type Objective = {
  objective: string,
  answer: string[],
}

export type ModuleJSON = {
  module: string,
  scenario: string,
  objectives: Objective[],
  character_prompt: string,
}

export type VercelHandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type VercelHandleSubmit = (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: any) => void
