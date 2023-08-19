import { MessageResponse } from "@/types";

export async function POST(req: Request) {
  const data = JSON.parse(await req.text()).selected;
  return new Response(JSON.stringify(getTranslate(data)), {
    headers: { "Content-Type": "application/json" },
  });
}

export const getTranslate = (content: string) => {
  return {
    message: content + " translated lololol",
  } as MessageResponse;
};
