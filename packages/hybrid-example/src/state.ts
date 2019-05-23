import { RollupBuild, RollupOutput } from "rollup";
import { isOutputAsset } from "../rollup-utils";

export interface State {
  updateRollupBuild(newBuild: RollupBuild, outputPromise: Promise<RollupOutput>): void;

  getChunkNamesFor(name: string): Promise<Array<string> | undefined>;
}

export function makeState(): State {
  let outputPromises: Array<Promise<RollupOutput>> = [];

  function updateRollupBuild(newBuild: RollupBuild, outputPromise: Promise<RollupOutput>) {
    console.log("updateRollupBuild")
    outputPromises = [outputPromise];
  }

  async function getChunkNamesFor(name: string): Promise<Array<string> | undefined> {
    const latestOutputPromise = outputPromises[outputPromises.length - 1];
    if (!latestOutputPromise) {
      return;
    }

    const { output: outputItems } = await latestOutputPromise;

    console.log("outputItems", outputItems.length, outputItems.map(a => ({ fileName: a.fileName, keys: Object.keys(a).join(" "), name: (a as any)["name"] })))

    for (let outputItem of outputItems) {
      if (isOutputAsset(outputItem)) {
        console.log("Asset", outputItem.fileName);
      } else {
        const { code, map, ...rest } = outputItem;
        console.log("Chunk", outputItem.name, outputItem.fileName, rest);
        if (outputItem.isEntry && outputItem.name === name) {
          // Hack: I have no idea if this is in reverse order or not
          return outputItem.imports.slice().reverse();
        }
      }
    };

    // imports:
    return [];
  }

  return {
    updateRollupBuild,
    getChunkNamesFor
  };
}
