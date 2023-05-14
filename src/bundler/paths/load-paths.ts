import fs from "fs";
import path from "path";

export function loadFilePaths(entrydir: string, filter: RegExp) {
  const content = fs.readdirSync(entrydir, "utf-8");
  const filenames = content.filter((item) => filter.test(item));

  return filenames.map((filename) => {
    const entry = path.resolve(entrydir, filename);
    return { filename, entry };
  });
}
