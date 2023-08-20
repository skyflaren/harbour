import { MessageResponse } from "@/types";
import axios from "axios";

const API_KEY = process.env.GOOGLE_API_KEY;

export async function POST(req: Request) {
  const data = JSON.parse(await req.text());
  const selected = data.selected;
  const langCode = data.langCode;
  return new Response(JSON.stringify(await translateText(selected, 'en')), {
    headers: { "Content-Type": "application/json" },
  });
}

async function translateText(
  text: string,
  targetLanguage: string = "en"
): Promise<MessageResponse> {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  const response = await axios.post(url, {
    q: text,
    target: targetLanguage,
    format: "text",
  });

  const translatedText = response.data.data.translations[0].translatedText;
  return { message: translatedText } as MessageResponse;
}
