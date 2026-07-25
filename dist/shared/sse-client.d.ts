/**
 * Lightweight SSE (Server-Sent Events) client for Node.js.
 * Uses native fetch + ReadableStream — no dependencies.
 */
export interface SseEvent {
    event: string
    data: string
}
export interface SseConnectionOptions {
    url: string
    headers?: Record<string, string>
    onEvent: (event: SseEvent) => void
    onError?: (error: unknown) => void
}
/**
 * SSE connection with automatic reconnect and exponential backoff.
 *
 * Designed for the schema-watch use case: Strapi restarts break the
 * connection, the client reconnects automatically and receives the
 * fresh hash on the `connected` event.
 */
export declare class SseConnection {
    private opts
    private controller
    private reconnectTimer
    private closed
    /** Current backoff delay in ms (resets on successful connect) */
    private backoff
    private static MIN_BACKOFF
    private static MAX_BACKOFF
    constructor(opts: SseConnectionOptions)
    /** Start the SSE connection. Safe to call multiple times. */
    connect(): void
    /** Permanently close the connection and cancel any pending reconnect. */
    close(): void
    private abort
    private scheduleReconnect
    private run
}
//# sourceMappingURL=sse-client.d.ts.map
