import OpenAI from "openai"
import { ChatCompletionChunk, OpenAIStreamPayload } from "@/types";

import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export const getLlmResponse = async (payload: OpenAIStreamPayload) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const gptResponse = await openai.chat.completions.create(
    payload
  );
  
  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of gptResponse as any) {
        console.log("BACKEND CHUNK", chunk.choices[0].delta?.content)
        parser.feed(chunk.choices[0].delta?.content);
      }
    },
  });

  return stream;
}
