import { NextApiRequest, NextApiResponse } from "next";
import { MessageResponse } from "@/types";
import { getTranslate } from "@/services/getTranslate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method not allowed, please use POST" });
  }
  console.log(req);
  const { prompt } = JSON.parse(req.body);
  console.log("PROMPT RECEIVED BY HANDLER", prompt);
  const translated = await getTranslate(prompt);

  return res.status(200).json(translated);
}
