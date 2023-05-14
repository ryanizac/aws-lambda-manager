import { createLambdaClient, prepareCreateCommand } from "./lambda";
import { loadFilePaths } from "./paths";
import { generateZip } from "./zip";
import { getBuild } from "./build";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const entrydir = "./src/lambdas";
  const extenion = /.ts$/;

  const files = loadFilePaths(entrydir, extenion);
  const lambdaClient = createLambdaClient();

  files.forEach(async (file) => {
    const code = await getBuild(file.entry);
    const zip = generateZip({ code });
    const name = file.filename.replace(extenion, "");

    const cmd = prepareCreateCommand({
      name,
      content: zip,
      extractEnv: ["host", "port", "user", "password"],
    });

    await lambdaClient.send(cmd);
  });
}

main();
