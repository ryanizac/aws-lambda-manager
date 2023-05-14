import {
  Architecture,
  CreateFunctionCommand,
  PackageType,
  Runtime,
} from "@aws-sdk/client-lambda";

export type Options = {
  content: Buffer;
  name: string;
  role?: string;
  extractEnv?: string[];
};

export function prepareCreateCommand({
  name,
  content,
  role,
  extractEnv = [],
}: Options) {
  role ||= process.env.role;

  if (!role) {
    throw new Error("The role is not provided");
  }

  const env = {};

  for (const key of extractEnv) {
    const value = process.env[key];

    if (!value) {
      throw new Error(`Env ${key} not found`);
    }

    Object.defineProperty(env, key, {
      value,
      enumerable: true,
    });
  }

  const cmd = new CreateFunctionCommand({
    Code: { ZipFile: content },
    FunctionName: name,
    Role: role,
    Architectures: [Architecture.arm64],
    Handler: "index.handler",
    PackageType: PackageType.Zip,
    Runtime: Runtime.nodejs16x,
    Environment: {
      Variables: env,
    },
  });

  return cmd;
}
