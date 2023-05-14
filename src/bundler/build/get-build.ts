import esbuild from "esbuild";

export async function getBuild(entry: string) {
  const buildResult = await esbuild.build({
    entryPoints: [entry],
    packages: "external",
    format: "cjs",
    bundle: true,
    write: false,
  });

  const outfileContent = buildResult.outputFiles[0].contents;

  return outfileContent;
}
