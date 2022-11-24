import { build as esbuild, serve, BuildOptions } from "esbuild";
import nodeExternalsPlugin from "esbuild-node-externals";
import { Colors } from "./colorsUtils";
import { buildDeclarations } from "./tsUtils";

export const baseConfig: BuildOptions = {
  bundle: true,
  sourcemap: true,
  // splitting: true,
};

export const start = async (entryPoints: string, outfile: string) => {
  const start = new Date().getTime();
  serve(
    {
      port: 8000,
      servedir: "./config/static",
      onRequest: (args) => {
        // console.log(args);
      },
    },
    {
      // plugins: [pnpPlugin()],
      ...baseConfig,
      entryPoints: [entryPoints],
      outfile: "./config/static/out.js",
    }
  ).then((server) => {
    console.log(`http://127.0.0.1:${server.port}/`);

    const end = new Date().getTime();
    const time = end - start;
    console.log(
      Colors.FgGreen,
      `Started in ${(time / 1000).toFixed(5)} sec.`,
      Colors.Reset
    );

    // Call "stop" on the web server to stop serving
    // server.stop()
  });
};

export const build = async (
  bashPath: string,
  tsconfigPath: string,
  srcPath: string,
  outPath: string,
  declarationsOutPath: string
) => {
  const start = new Date().getTime();
  esbuild({
    ...baseConfig,
    plugins: [
      // pnpPlugin(),
      nodeExternalsPlugin(),
    ],
    entryPoints: ["./src/index.ts"],
    outdir: outPath,
    minify: true,
    format: "cjs",
  })
    .then(async () => {
      const endBuild = new Date().getTime();
      const timeBuild = endBuild - start;

      console.log(
        Colors.FgGreen,
        `Build done in ${(timeBuild / 1000).toFixed(3)} sec.`,
        Colors.Reset
      );

      // https://gist.github.com/jeremyben/4de4fdc40175d0f76892209e00ece98f
      await buildDeclarations(
        bashPath,
        tsconfigPath,
        srcPath,
        declarationsOutPath
      );
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
