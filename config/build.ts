import path from "path";
import { build } from "./utils/esbuildUtils.ts";

const outPath = path.resolve(".", "dist/");
const tsconfigPath = path.resolve(".", "tsconfig.build.json");
// console.log({ outDir, tsconfig });

build(tsconfigPath, outPath);
