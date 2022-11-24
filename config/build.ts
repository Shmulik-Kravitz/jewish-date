import path from "path";
import { build } from "./utils/esbuildUtils";
import filterConsole from "./utils/filterConsoleUtils";

const disableFilter = filterConsole(["MODULE_NOT_FOUND"]);

const outPath = path.resolve(".", "dist/");
const declarationPath = path.resolve(".", "lib/");

const srcPath = path.resolve(".", "src/");
const tsconfigPath = path.resolve(".", "tsconfig.json");
// console.log({ outDir, tsconfig });

build(__dirname, tsconfigPath, srcPath, outPath, declarationPath);
