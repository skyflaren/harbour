import { ChatCompletion, MessageResponse } from "@/types";

export const fetchLLMResponse = async (prompt: string): Promise<Response> => {
  const response = await fetch("/api/openai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  return response;
}