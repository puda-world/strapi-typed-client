/**
 * Check command - verifies that local types are in sync with remote schema
 * Returns exit code 0 if in sync, 1 if out of sync
 */
import type { Command } from 'commander'
export interface CheckOptions {
    url?: string
    token?: string
    output?: string
    silent?: boolean
}
export interface CheckResult {
    inSync: boolean
    localHash: string | null
    remoteHash: string | null
    error?: string
}
/**
 * Check if local types are in sync with remote schema
 */
export declare function check(options: CheckOptions): Promise<CheckResult>
/**
 * CLI handler for check command
 */
export declare function createCheckCommand(program: Command): void
//# sourceMappingURL=check.d.ts.map
