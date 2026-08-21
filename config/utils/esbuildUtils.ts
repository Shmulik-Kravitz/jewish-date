// import { build as esbuild, serve, BuildOptions } from "esbuild";
import * as esbuild from "esbuild";
import nodeExternalsPlugin from "esbuild-node-externals";
import path from "path";
import fs from "fs-extra";
import { Colors } from "./colorsUtils.ts";
import { buildDeclarations } from "./tsUtils.ts";
import { getFiles } from "./filesUtils.ts";
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

export const baseConfig: esbuild.BuildOptions = {
  bundle: true,
  sourcemap: true,
  // splitting: true,
};

export const start = async (entryPoints: string, outfile: string) => {
  const start = new Date().getTime();
  const ctx = await esbuild.context({
    // plugins: [pnpPlugin()],
    ...baseConfig,
    entryPoints: [entryPoints],
    outfile: "./config/static/out.js",
  });
  const { hosts, port } = await ctx.serve({
    port: 3000,
    servedir: "./config/static",
    onRequest: (args) => {
      // console.log(args);
    },

  });
  for (const host of hosts) {
    // IPv6 addresses need brackets to form a valid URL.
    const hostname = host.includes(":") ? `[${host}]` : host;
    console.log(`http://${hostname}:${port}/`);
  }

  const end = new Date().getTime();
  const time = end - start;
  console.log(
    Colors.FgGreen,
    `Started in ${(time / 1000).toFixed(5)} sec.`,
    Colors.Reset
  );
  // Call "stop" on the web server to stop serving
  // server.stop()
};

export const build = async (tsconfigPath: string, outPath: string) => {
  const start = new Date().getTime();
  const outPathEsm = path.resolve(outPath, "mjs");
  const entryPoints = (await getFiles(path.join(process.cwd(), "src"))).map((file) => file.replace(process.cwd(), '.'));

  // console.log(entryPoints);
  Promise.all([
    esbuild.build({
      ...baseConfig,
      plugins: [
        // pnpPlugin(),
        nodeExternalsPlugin(),
      ],
      entryPoints: ["./src/index.ts"],
      outdir: outPath,
      minify: true,
      format: "cjs",
    }),
    esbuild.build({
      ...baseConfig,
      bundle: true,
      plugins: [
        // pnpPlugin(),
        nodeExternalsPlugin(),
        esbuildPluginFilePathExtensions({ esm: true, esmExtension: "js" }),
      ],
      entryPoints: entryPoints,
      outdir: outPathEsm,
      minify: true,
      format: "esm",
      target: "esnext",
    }),
  ])

    .then(async () => {
      // Marks the ESM output as a module. Written directly rather than copied
      // out of config/, so the build does not depend on that layout.
      const esmDistPackageJsonPath = path.resolve(outPathEsm, "package.json");
      await fs.writeJSON(esmDistPackageJsonPath, { type: "module" }, { spaces: 2 });

      const endBuild = new Date().getTime();
      const timeBuild = endBuild - start;

      console.log(
        Colors.FgGreen,
        `Build done in ${(timeBuild / 1000).toFixed(3)} sec.`,
        Colors.Reset
      );

      // https://gist.github.com/jeremyben/4de4fdc40175d0f76892209e00ece98f
      await buildDeclarations(tsconfigPath);
      const end = new Date().getTime();
      const time = end - endBuild;
      console.log(
        Colors.FgGreen,
        `Build declarations done in ${(time / 1000).toFixed(3)} sec.`,
        Colors.Reset
      );
    })
    .catch((err) => {
      // console.error(err.error);
      process.exit(1);
    });
};
