/**
 * File writer utilities for CLI output
 */
export interface WriteResult {
    path: string
    success: boolean
    error?: Error
}
/**
 * Ensure directory exists
 */
export declare function ensureDir(dirPath: string): void
/**
 * Write content to a file
 */
export declare function writeFile(
    filePath: string,
    content: string,
): WriteResult
/**
 * Read content from a file
 */
export declare function readFile(filePath: string): string | null
/**
 * Check if file exists
 */
export declare function fileExists(filePath: string): boolean
/**
 * Write multiple files. Reports all results even if some fail.
 */
export declare function writeFiles(
    files: Array<{
        path: string
        content: string
    }>,
): WriteResult[]
/**
 * Output that lands inside node_modules is ephemeral — a reinstall wipes it,
 * so the types must be regenerated. Used to bar `--format ts` from it and to
 * nudge `--format js` users toward a durable, committable output directory.
 */
export declare function isInsideNodeModules(outputDir: string): boolean
/**
 * Shipping raw .ts into node_modules breaks at runtime: Node can't require
 * .ts files and the package.json exports still point at the missing .js.
 * Force consumers to pick a source-tree output instead.
 */
export declare function assertOutputDirForFormat(
    outputDir: string,
    format: 'js' | 'ts',
): void
/**
 * Require an explicit output directory. The generated client is meant to be
 * written into your source tree and committed — there is no implicit
 * node_modules default (a reinstall would wipe it). Throws an actionable error
 * when no output was given, so both the CLI and programmatic callers fail loudly
 * instead of silently writing somewhere unexpected.
 */
export declare function requireOutputDir(output: string | undefined): string
/**
 * Read schema hash from the generated client. SCHEMA_HASH is baked into the
 * client at generation time as the first export.
 */
export declare function readLocalSchemaHash(outputDir: string): string | null
/**
 * Read the GENERATOR_VERSION baked into the generated client at generation
 * time. Used to detect when committed types drift from the installed CLI
 * version. Returns null when not generated or the constant is absent (e.g.
 * clients generated before version stamping was introduced).
 */
export declare function readLocalGeneratorVersion(
    outputDir: string,
): string | null
//# sourceMappingURL=file-writer.d.ts.map
