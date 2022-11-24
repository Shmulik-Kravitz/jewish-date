import { start } from "./utils/esbuildUtils";

const entryPoints = "./app/index.tsx";
const outfile = "./config/static/out.js";

start(entryPoints, outfile);
