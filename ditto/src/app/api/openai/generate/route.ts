import { OpenAIStreamPayload } from '@/types'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
 
export const runtime = 'edge'
 
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

 
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };
 
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion(payload)
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
 
  // Respond with the stream
  return new StreamingTextResponse(stream)
}