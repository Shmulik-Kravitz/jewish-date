import { spawnSync } from "child_process";

// TypeScript 7 is a native binary without a programmatic build API,
// so declarations are emitted by shelling out to the `tsc` CLI.
export async function buildDeclarations(tsconfigPath: string) {
  // Passed as a single command string rather than a command plus an args
  // array, which `shell: true` deprecates (DEP0190).
  const { status, error } = spawnSync(`yarn tsc -p "${tsconfigPath}"`, {
    stdio: "inherit",
    shell: true,
  });

  if (error) {
    throw error;
  }

  if (status !== 0) {
    throw new Error(`tsc exited with code ${status}`);
  }
}
