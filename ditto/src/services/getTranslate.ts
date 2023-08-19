import { MessageResponse } from "@/types";

export const getTranslate = async (content: string) => {
  return {
    message: content + " translated lololol",
  } as MessageResponse;
};
