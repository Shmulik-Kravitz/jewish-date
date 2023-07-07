import fs from "fs";
import path from "path";
import { promisify } from "util";
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export const getFiles = async (dir: string) => {
  const subDirs = await readdir(dir);
  const files = await Promise.all(
    subDirs.map(async (subDir) => {
      const res = path.resolve(dir, subDir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }),
  );
  return files.reduce((a, f) => a.concat(f), []);
};
