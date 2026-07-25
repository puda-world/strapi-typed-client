/**
 * Watch command - connects to SSE stream and regenerates types on schema changes
 */
import type { Command } from 'commander'
export interface WatchOptions {
    url?: string
    token?: string
    output?: string
    silent?: boolean
    typecheck?: boolean
}
/**
 * Watch for schema changes via SSE
 */
export declare function watch(options: WatchOptions): Promise<void>
/**
 * CLI handler for watch command
 */
export declare function createWatchCommand(program: Command): void
//# sourceMappingURL=watch.d.ts.map
