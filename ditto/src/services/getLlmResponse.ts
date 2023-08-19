import OpenAI from "openai"

export const getLlmResponse = async (prompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const gptResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        "role": "user",
        "content": prompt
      }
    ]
  });

  return gptResponse;
}
