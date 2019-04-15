import { routes } from "./src/main";
import { startServer } from "./src/server";
import { watch } from "./rollup-build";

watch();

startServer(routes);
