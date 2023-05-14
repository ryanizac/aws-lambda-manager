import { LambdaClient } from "@aws-sdk/client-lambda";

export function createLambdaClient() {
  const accessKeyId = process.env.accessKeyId;
  const secretAccessKey = process.env.secretAccessKey;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Env accessKeyId or secretAccessKey not found");
  }

  return new LambdaClient({
    region: "us-east-1",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}
