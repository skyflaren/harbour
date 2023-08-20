// Async function to take in a JSON file name in public/data and return the JSON object
import fs from "fs";

export async function POST(req: Request) {
  // console.log("req", req)
  const { fileName } = await req.json();

  const filePath = `./public/data/${fileName}.json`;

  let fileContent = fs.readFileSync(filePath, "utf8");

  if (!fileContent) {
    return new Response("File not found", { status: 404 });
  }

  return new Response(fileContent, { status: 200 });
}
