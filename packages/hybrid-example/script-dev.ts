import { routes } from "./src/main";
import { makeState } from "./src/state";
import { startServer } from "./src/server";
import { watch } from "./rollup-build";

const state = makeState();

watch({
  initialBuild: true,
  onBuild(build, outputPromise) {
    state.updateRollupBuild(build, outputPromise);
  }
});

startServer({ routes, state });
