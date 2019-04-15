///<reference path="./deps.d.ts"/>
import * as rollup from "rollup";
import rollupPluginTypescript from "rollup-plugin-typescript";
import rollupPluginIIFE from "rollup-plugin-iife";
import rollupPluginEntrypoint from "rollup-plugin-entrypoint-hashmanifest";
import { Templates } from "./src/main";

async function go() {
  // const mainBundle = await rollup.rollup({
  //   input: "./src/main.ts",
  //   plugins: [rollupPluginTypescript()]
  // });

  // await mainBundle.write({
  //   dir: "dist",
  //   format: "iife",
  //   name: "main",
  //   sourcemap: true
  // });

  const templateNames = Object.keys(Templates) as Array<keyof typeof Templates>;
  // const promises = templateNames.map(async (templateName) => {
  //   const templateBundle = await rollup.rollup({
  //     input: `./src/templates/${templateName}/${templateName}.tsx`,
  //     plugins: [rollupPluginTypescript()],
  //     external: ["react"]
  //   });
  //   await templateBundle.write({
  //     dir: "dist/templates",
  //     globals: {
  //       react: "React"
  //     },
  //     format: "iife",
  //     name: "main",
  //     sourcemap: true
  //   });
  // });

  // await Promise.all(promises);

  const input = {} as Record<string, string>;
  templateNames.forEach(templateName => {
    input[templateName] = `./src/templates/${templateName}/${templateName}.tsx`;
  });

  const shouldWatch = !!process.env.WATCH;

  const inputOptions: rollup.InputOptions = {
    input: input,
    plugins: [rollupPluginTypescript(), rollupPluginIIFE(), rollupPluginEntrypoint({
      manifestName: "dist/entrypoint.hashmanifest.json"
    })],
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

  if (shouldWatch) {
    rollup.watch([{ ...inputOptions, output: outputOptions }]);
  } else {
    const templateBundle = await rollup.rollup(inputOptions);
    await templateBundle.write(outputOptions);
  }
}

go();
