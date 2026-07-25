/**
 * Init command - scaffolds the committed-codegen workflow: validates the
 * url/output/format choices and writes strapi:generate / strapi:check
 * scripts into the consumer's package.json
 */
import type { Command } from 'commander'
import { type Prompter } from '../utils/prompt.js'
export interface InitOptions {
    url?: string
    output?: string
    format?: string
    yes?: boolean
    force?: boolean
    silent?: boolean
    cwd?: string
}
export interface ScriptConflict {
    name: string
    current: string
    proposed: string
}
export interface InitResult {
    success: boolean
    error?: string
    packageJsonPath?: string
    scriptsAdded: string[]
    scriptsOverwritten: string[]
    scriptsSkipped: string[]
    conflicts: ScriptConflict[]
}
/**
 * Validate a URL destined for a committed script. `new URL` alone accepts
 * scheme-less strings like 'localhost:1337' ('localhost:' parses as the
 * protocol), so the scheme must be checked explicitly.
 */
export declare function validateStrapiUrl(raw: string): string
/**
 * Normalize an output path for embedding into a committed script: POSIX
 * separators and a ./ prefix so the script works for every teammate.
 * Absolute paths are relativized against cwd (or rejected when outside it) —
 * a committed absolute path only works on the machine that ran init.
 */
export declare function normalizeOutputForScript(
    output: string,
    cwd: string,
): string
export interface InitScriptValues {
    output: string
    format: 'js' | 'ts'
    url?: string
}
export declare function buildInitScripts(
    values: InitScriptValues,
): Record<string, string>
export interface ApplyScriptsResult {
    content: string
    changed: boolean
    added: string[]
    overwritten: string[]
    skipped: string[]
    conflicts: ScriptConflict[]
}
/**
 * Add scripts to a package.json string while keeping the file's own dialect
 * (BOM, CRLF, indent, trailing newline) so the resulting diff is only the
 * added lines. Returns the original content untouched when nothing changed,
 * which is what makes re-runs byte-identical.
 */
export declare function applyScriptsToPackageJson(
    raw: string,
    scripts: Record<string, string>,
    force: boolean,
): ApplyScriptsResult
/**
 * Scaffold the committed-codegen setup. Never throws and never exits — errors
 * come back in the result (exit codes live in the commander wrapper).
 * `prompter` is injectable for tests; the terminal implementation is only
 * created when prompting will actually happen.
 */
export declare function init(
    options: InitOptions,
    prompter?: Prompter,
): Promise<InitResult>
/**
 * CLI handler for init command
 */
export declare function createInitCommand(program: Command): void
//# sourceMappingURL=init.d.ts.map
