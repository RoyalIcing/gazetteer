///<reference path="./deps.d.ts"/>
import * as rollup from "rollup";
import rollupPluginTypescript from "rollup-plugin-typescript";
import rollupPluginIIFE from "rollup-plugin-iife";
import rollupPluginEntrypoint from "rollup-plugin-entrypoint-hashmanifest";
import { Templates } from "./src/main";

function rollupOptions(): {
  inputOptions: rollup.InputOptions;
  outputOptions: rollup.OutputOptions;
} {
  const templateNames = Object.keys(Templates) as Array<keyof typeof Templates>;

  const input = {} as Record<string, string>;
  templateNames.forEach(templateName => {
    input[templateName] = `./src/templates/${templateName}/${templateName}.tsx`;
  });

  const inputOptions: rollup.InputOptions = {
    input: input,
    plugins: [
      rollupPluginTypescript(),
      rollupPluginIIFE(),
      rollupPluginEntrypoint({
        manifestName: "dist/entrypoint.hashmanifest.json"
      })
    ],
    external: ["react"]
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

export async function build() {
  const { inputOptions, outputOptions } = rollupOptions();
  const templateBundle = await rollup.rollup(inputOptions);
  await templateBundle.write(outputOptions);
}

export function watch(): rollup.RollupWatcher {
  const { inputOptions, outputOptions } = rollupOptions();
  return rollup.watch([{ ...inputOptions, output: outputOptions }]);
}
