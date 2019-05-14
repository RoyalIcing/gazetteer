declare module 'rollup-plugin-typescript' {
  import * as rollup from "rollup";
  export default function(): rollup.Plugin;
}

declare module 'rollup-plugin-iife' {
  import * as rollup from "rollup";
  export default function(): rollup.Plugin;
}

declare module 'rollup-plugin-entrypoint-hashmanifest' {
  import * as rollup from "rollup";
  export default function(options?: { manifestName?: string }): rollup.Plugin;
}

declare module 'rollup-plugin-alias' {
  import * as rollup from "rollup";
  export default function(mapping: Record<string, string>): rollup.Plugin;
}