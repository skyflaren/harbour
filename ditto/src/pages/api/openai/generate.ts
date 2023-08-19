import { NextApiRequest, NextApiResponse } from 'next'
import { getLlmResponse } from '@/utils/services/getLlmResponse'
import { ChatCompletion, ChatCompletionChunk, MessageResponse } from '@/types'
import { OpenAIStreamPayload } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReadableStream | MessageResponse>
){
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed, please use POST' })
  }
  console.log(req.body);
  const { prompt } = req.body;

  console.log("PROMPT RECEIVED BY HANDLER", prompt);

  if (!prompt) {
    return res.status(400).json({ message: 'Missing prompt in request' })
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const gptResponse = await getLlmResponse(payload);

  return res.status(200).json(gptResponse);
}