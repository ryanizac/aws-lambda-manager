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
};

export function prepareCreateCommand({ name, content, role }: Options) {
  role ||= process.env.role;

  if (!role) {
    throw new Error("The role is not provided");
  }

  const cmd = new CreateFunctionCommand({
    Code: { ZipFile: content },
    FunctionName: name,
    Role: role,
    Architectures: [Architecture.arm64],
    Handler: "index.handler",
    PackageType: PackageType.Zip,
    Runtime: Runtime.nodejs16x,
  });

  return cmd;
}
