import { ChatCompletion, MessageResponse } from "@/types";

export const fetchLLMResponse = async (prompt: string): Promise<ChatCompletion> => {
  const res = await fetch('/api/openai/llmResponse', {
    method: 'POST',
    body: JSON.stringify({
      prompt: prompt,
    }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  console.log(data);
  return data;
}