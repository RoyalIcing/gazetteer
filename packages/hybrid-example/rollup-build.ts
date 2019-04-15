///<reference path="./deps.d.ts"/>
import * as rollup from "rollup";
import rollupPluginResolve from 'rollup-plugin-node-resolve';
import rollupPluginCommonjs from 'rollup-plugin-commonjs';
import rollupPluginTypescript from "rollup-plugin-typescript";
import rollupPluginIIFE from "rollup-plugin-iife";
import rollupPluginEntrypoint from "rollup-plugin-entrypoint-hashmanifest";
import rollupPluginReplace from 'rollup-plugin-replace';
import { Templates } from "./src/main";

const env = process.env.NODE_ENV || 'development';

function rollupOptions(): {
  inputOptions: rollup.InputOptions;
  outputOptions: rollup.OutputOptions;
} {
  const templateNames = Object.keys(Templates) as Array<keyof typeof Templates>;

  const input = {} as Record<string, string>;
  templateNames.forEach(templateName => {
    input[templateName] = `./src/templates/${templateName}/${templateName}.tsx`;
  });

  input["activateTemplate"] = `./src/templates/browser.tsx`;

  const inputOptions: rollup.InputOptions = {
    input: input,
    plugins: [
      rollupPluginTypescript(),
      rollupPluginResolve(),
      rollupPluginCommonjs(),
      rollupPluginReplace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      rollupPluginIIFE(),
      rollupPluginEntrypoint({
        manifestName: "dist/entrypoint.hashmanifest.json"
      })
    ]
    // external: ["react"]
  };

  const outputOptions: rollup.OutputOptions = {
    dir: "dist",
    entryFileNames: "entry-[name]-[hash].js",
    chunkFileNames: "chunk-[hash].js",
    globals: {
      react: "React"
    },
    format: "es",
    name: "main",
    sourcemap: true
  };

  return { inputOptions, outputOptions };
}

function isOutputAsset(outputItem: rollup.OutputAsset | rollup.OutputChunk): outputItem is rollup.OutputAsset {
  return (outputItem as rollup.OutputAsset).isAsset === true;
}

export async function build() {
  const { inputOptions, outputOptions } = rollupOptions();
  const templateBundle = await rollup.rollup(inputOptions);
  const { output: outputItems } = await templateBundle.write(outputOptions);

  outputItems.forEach(outputItem => {
    if (isOutputAsset(outputItem)) {
      console.log("Asset", outputItem.fileName);
    } else {
      const { code, map, ...rest } = outputItem;
      console.log("Chunk", outputItem.fileName, rest);
    }
    console.log(outputItem.fileName);
  });
}

export function watch(): rollup.RollupWatcher {
  const { inputOptions, outputOptions } = rollupOptions();
  return rollup.watch([{ ...inputOptions, output: outputOptions }]);
}
