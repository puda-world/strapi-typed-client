/**
 * Schema controller for Strapi Types Plugin
 * Exposes endpoints for fetching schema, schema hash, and SSE schema watch
 */
export interface StrapiContext {
    state: {
        user?: unknown
    }
    request: {
        header: Record<string, string | undefined>
    }
    unauthorized: (message: string) => void
    set: (key: string, value: string) => void
    status: number
    body: unknown
    req: {
        on: (event: string, listener: () => void) => void
    }
}
export interface StrapiInstance {
    config: {
        get: (key: string, defaultValue?: unknown) => unknown
    }
    plugin: (name: string) => {
        service: (name: string) => {
            getSchema: () => unknown
            getSchemaHash: () => unknown
        }
    }
    service: (uid: string) => any
    log: {
        error: (message: string, error?: unknown) => void
        warn?: (message: string, error?: unknown) => void
    }
}
declare const _default: ({ strapi }: { strapi: StrapiInstance }) => {
    /**
     * GET /api/strapi-typed-client/schema
     * Returns the full schema with hash
     */
    getSchema(ctx: StrapiContext): Promise<void>
    /**
     * GET /api/strapi-typed-client/schema-hash
     * Returns only the schema hash (lightweight)
     */
    getSchemaHash(ctx: StrapiContext): Promise<void>
    /**
     * GET /api/strapi-typed-client/schema-watch
     * SSE stream that sends the current hash on connect.
     * When Strapi restarts the connection drops — the client
     * reconnects and gets the (possibly new) hash automatically.
     */
    schemaWatch(ctx: StrapiContext): Promise<void>
}
export default _default
//# sourceMappingURL=schema.d.ts.map
