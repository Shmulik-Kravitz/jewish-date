import { start } from "./utils/esbuildUtils.ts";

const entryPoints = "./app/index.tsx";
const outfile = "./config/static/out.js";

start(entryPoints, outfile);
