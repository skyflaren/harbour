import { useQuery } from "@tanstack/react-query";

import { fetchJson } from "@/utils/api/fetchJson";

export const useJson = (fileName: string) => {
  return useQuery({
    queryKey: [`json ${fileName}`],
    queryFn: () => fetchJson(fileName as string),
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: !!fileName,
  });
};