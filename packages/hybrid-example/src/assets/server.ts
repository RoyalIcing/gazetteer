import * as Path from "path";
import * as FS from "fs";
import { promisify } from "util";
import Boom from "boom";

const readFile = promisify(FS.readFile);

async function readEntrypointJSON(): Promise<Record<string, string>> {
  const data = await readFile(Path.join(__dirname, "../..", "dist/entrypoint.hashmanifest.json"), {
    encoding: "utf-8"
  });
  return JSON.parse(data);
}

export async function assetPublicPathForTemplate(templateName: string): Promise<string | undefined> {
  const entrypointJSON = await readEntrypointJSON();

  const templateSourcePath = `./src/templates/${templateName}/${templateName}.tsx`;
  const assetFileName = entrypointJSON[templateSourcePath];
  if (!assetFileName) {
    return;
  }

  return assetFileName;
}

export async function loadAssetForPublicPath(
  publicPath: string
): Promise<Buffer | undefined> {
  const entrypointJSON = await readEntrypointJSON();

  let assetSourcePath = "./src/" + publicPath;
  // Handle .js as .tsx
  assetSourcePath = assetSourcePath.replace(/\.js$/, ".tsx");

  const assetFileName = entrypointJSON[assetSourcePath];
  if (!assetFileName) {
    throw Boom.notFound(`Asset not found: ${publicPath}`);
  }

  const filePath = Path.join(__dirname, "../..", "dist", assetFileName);
  try {
    const data = await readFile(filePath);
    return data;
  } catch {
    return;
  }
}

export async function loadChunkForPublicPath(
  publicPath: string
): Promise<Buffer | undefined> {
  const filePath = Path.join(__dirname, "../..", "dist", publicPath);
  try {
    const data = await readFile(filePath);
    return data;
  } catch {
    return;
  }
}
