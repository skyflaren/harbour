import fs from 'fs';

export const getModuleContent = (fileName: string) => {
  const filePath = `./public/data/${fileName}.json`;
  
  let fileContent = fs.readFileSync(filePath, 'utf8');
  return fileContent;
};