import { ModuleJSON } from '@/types';

export const fetchJson = async (fileName: string): Promise<ModuleJSON> => {
  const response = await fetch('/api/json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName: fileName,
    }), 
  })

  const data = await response.json();
  return data;
}