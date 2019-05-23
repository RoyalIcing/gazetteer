import { routes } from "./src/main";
import { makeState } from "./src/state";
import { startServer } from "./src/server";

const state = makeState();

startServer({ routes, state });
