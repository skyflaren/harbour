import { ChatCompletion, MessageResponse } from "@/types";

export const fetchLLMResponse = async (prompt: string): Promise<ReadableStream<Uint8Array> | null> => {
  const response = await fetch("/api/openai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = response.body;
  return data;
}