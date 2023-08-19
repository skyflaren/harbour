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
};
export type ChatCompletion = OpenAI.Chat.ChatCompletion;

export interface Lesson {
  id: number;
  image: string;
  name: string;
  desc: string;
  link: string;
}
