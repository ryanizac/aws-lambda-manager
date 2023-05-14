import AdmZip from "adm-zip";

type Options = {
  code: string | Uint8Array;
  filename?: string;
};

export function generateZip({ code, filename = "index.js" }: Options): Buffer {
  const zip = new AdmZip();
  zip.addFile(filename, Buffer.from(code));
  return zip.toBuffer();
}
