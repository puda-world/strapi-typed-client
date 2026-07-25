/**
 * Generate command - generates TypeScript types from Strapi schema
 */
import type { Command } from 'commander'
export interface GenerateOptions {
    url?: string
    token?: string
    output?: string
    silent?: boolean
    force?: boolean
    format?: 'js' | 'ts'
    typecheck?: boolean
}
export interface GenerateResult {
    success: boolean
    filesWritten: string[]
    hash?: string
    error?: string
    skipped?: boolean
}
/**
 * Whether committed output can be reused without regenerating. Requires the
 * files to exist AND both the schema hash and the generator version to match —
 * a package upgrade that changes the output format bumps the version, so an
 * unchanged schema still forces a regen (otherwise new emitters never ship).
 */
export declare function isGeneratedOutputFresh(params: {
    localHash: string | null
    remoteHash: string
    localVersion: string | null
    cliVersion: string
    allFilesExist: boolean
}): boolean
/**
 * Generate types from Strapi API
 */
export declare function generate(
    options: GenerateOptions,
): Promise<GenerateResult>
/**
 * CLI handler for generate command
 */
export declare function createGenerateCommand(program: Command): void
//# sourceMappingURL=generate.d.ts.map
