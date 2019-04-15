///<reference path="./deps.d.ts"/>
import * as rollup from "rollup";
import rollupTypescript from "rollup-plugin-typescript";
import rollupIIFE from "rollup-plugin-iife";
import { Templates } from "./src/main";

async function build() {
  // const mainBundle = await rollup.rollup({
  //   input: "./src/main.ts",
  //   plugins: [rollupTypescript()]
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
  //     plugins: [rollupTypescript()],
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

  const templateBundle = await rollup.rollup({
    input: input,
    plugins: [rollupTypescript(), rollupIIFE()],
    external: ["react"]
  });
  await templateBundle.write({
    dir: "dist/templates",
    entryFileNames: "entry-[name].js",
    globals: {
      react: "React"
    },
    format: "es",
    name: "main",
    sourcemap: true
  });
}

build();
