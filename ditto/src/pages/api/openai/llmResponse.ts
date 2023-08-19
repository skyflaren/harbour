import { NextApiRequest, NextApiResponse } from 'next'
import { getLlmResponse } from '@/services/getLlmResponse'
import { ChatCompletion, MessageResponse } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatCompletion | MessageResponse>
){
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed, please use POST' })
  }
  console.log(req);
  const { prompt } = JSON.parse(req.body);
  console.log("PROMPT RECEIVED BY HANDLER", prompt);
  const gptResponse = await getLlmResponse(prompt);

  return res.status(200).json(gptResponse);
}