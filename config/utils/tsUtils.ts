import { build as tscBuild} from "tsc-prog";

export async function buildDeclarations(basePath: string, tsconfigPath: string, srcPath: string, declarationsOutPath: string) {
    return new Promise<void>((resolve: () => void) => {
        tscBuild({
            basePath: basePath, // always required, used for relative paths
            configFilePath: tsconfigPath, // config to inherit from (optional)
            compilerOptions: {
                rootDir: srcPath,
                declaration: true,
                declarationDir: declarationsOutPath,
                emitDeclarationOnly: true,
                pretty: true,
            },
            include: ['src/**/*'],
            exclude: ['src/__test__/**/*'],
        });
        resolve()
    })
}