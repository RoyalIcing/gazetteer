import { OutputAsset, OutputChunk } from "rollup";

export function isOutputAsset(
  outputItem: OutputAsset | OutputChunk
): outputItem is OutputAsset {
  return (outputItem as OutputAsset).isAsset === true;
}
