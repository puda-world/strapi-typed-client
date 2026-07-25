/**
 * Schema controller for Strapi Types Plugin
 * Exposes endpoints for fetching schema, schema hash, and SSE schema watch
 */
import { PassThrough } from 'stream'
/**
 * Manually validate an API token since routes use auth: false
 * (Strapi skips its auth middleware when auth: false is set)
 */
async function validateApiToken(strapi, ctx) {
    // Already authenticated via other means
    if (ctx.state.user) return true
    const authorization = ctx.request.header.authorization
    if (!authorization) return false
    const [scheme, token] = authorization.split(' ')
    if (scheme !== 'Bearer' || !token) return false
    try {
        const apiTokenService = strapi.service('admin::api-token')
        const accessKey = await apiTokenService.hash(token)
        const storedToken =
            typeof apiTokenService.getByAccessKey === 'function'
                ? await apiTokenService.getByAccessKey(accessKey)
                : await apiTokenService.getBy({ accessKey })
        return !!storedToken
    } catch (error) {
        strapi.log?.warn?.(
            '[strapi-typed-client] token validation failed',
            error,
        )
        return false
    }
}
export default ({ strapi }) => ({
    /**
     * GET /api/strapi-typed-client/schema
     * Returns the full schema with hash
     */
    async getSchema(ctx) {
        const requireAuth = strapi.config.get(
            'plugin::strapi-typed-client.requireAuth',
            process.env.NODE_ENV === 'production',
        )
        if (requireAuth) {
            const isAuthenticated = await validateApiToken(strapi, ctx)
            if (!isAuthenticated) {
                return ctx.unauthorized(
                    'Authentication required to access schema',
                )
            }
        }
        try {
            const schemaService = strapi
                .plugin('strapi-typed-client')
                .service('schema')
            const result = schemaService.getSchema()
            ctx.body = result
        } catch (error) {
            strapi.log.error('Error extracting schema:', error)
            throw error
        }
    },
    /**
     * GET /api/strapi-typed-client/schema-hash
     * Returns only the schema hash (lightweight)
     */
    async getSchemaHash(ctx) {
        const requireAuth = strapi.config.get(
            'plugin::strapi-typed-client.requireAuth',
            process.env.NODE_ENV === 'production',
        )
        if (requireAuth) {
            const isAuthenticated = await validateApiToken(strapi, ctx)
            if (!isAuthenticated) {
                return ctx.unauthorized(
                    'Authentication required to access schema hash',
                )
            }
        }
        try {
            const schemaService = strapi
                .plugin('strapi-typed-client')
                .service('schema')
            const result = schemaService.getSchemaHash()
            ctx.body = result
        } catch (error) {
            strapi.log.error('Error computing schema hash:', error)
            throw error
        }
    },
    /**
     * GET /api/strapi-typed-client/schema-watch
     * SSE stream that sends the current hash on connect.
     * When Strapi restarts the connection drops — the client
     * reconnects and gets the (possibly new) hash automatically.
     */
    async schemaWatch(ctx) {
        const requireAuth = strapi.config.get(
            'plugin::strapi-typed-client.requireAuth',
            process.env.NODE_ENV === 'production',
        )
        if (requireAuth) {
            const isAuthenticated = await validateApiToken(strapi, ctx)
            if (!isAuthenticated) {
                return ctx.unauthorized(
                    'Authentication required to access schema watch',
                )
            }
        }
        // SSE headers
        ctx.set('Content-Type', 'text/event-stream')
        ctx.set('Cache-Control', 'no-cache')
        ctx.set('Connection', 'keep-alive')
        ctx.status = 200
        const stream = new PassThrough()
        ctx.body = stream
        // Send the current hash immediately
        try {
            const schemaService = strapi
                .plugin('strapi-typed-client')
                .service('schema')
            const { hash, generatedAt } = schemaService.getSchemaHash()
            stream.write(`retry: 1000\n`)
            stream.write(`event: connected\n`)
            stream.write(`data: ${JSON.stringify({ hash, generatedAt })}\n\n`)
        } catch (error) {
            strapi.log.error('Error sending initial SSE hash:', error)
            stream.end()
            return
        }
        // Heartbeat to keep the connection alive
        const heartbeat = setInterval(() => {
            stream.write(`: heartbeat\n\n`)
        }, 30_000)
        // Cleanup when client disconnects
        ctx.req.on('close', () => {
            clearInterval(heartbeat)
            stream.end()
        })
    },
})
//# sourceMappingURL=schema.js.map
