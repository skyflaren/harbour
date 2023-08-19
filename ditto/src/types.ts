import OpenAI from "openai"

export type MessageResponse = {
  message: string;
}
export type ChatCompletion = OpenAI.Chat.ChatCompletion;