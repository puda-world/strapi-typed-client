/**
 * Strapi Types Plugin
 *
 * Exposes Strapi schema through REST API for automatic TypeScript type generation.
 *
 * Endpoints:
 * - GET /api/strapi-typed-client/schema - Returns full schema with hash
 * - GET /api/strapi-typed-client/schema-hash - Returns only hash (lightweight)
 *
 * Usage in Strapi:
 * ```typescript
 * // config/plugins.ts
 * export default {
 *   'strapi-typed-client': {
 *     enabled: true,
 *     config: {
 *       requireAuth: false, // Optional: allow unauthenticated access
 *     },
 *   },
 * }
 * ```
 *
 * @packageDocumentation
 */
export type { StrapiContext, StrapiInstance } from './controllers/schema.js'
export type {
    StrapiAttribute,
    StrapiContentType,
    StrapiComponent,
    ExtractedSchema,
    SchemaResponse,
    HashResponse,
    ParsedEndpoint,
} from './services/schema.js'
export type { EndpointType, EndpointsResponse } from './services/endpoints.js'
interface StrapiPluginInstance {
    log: {
        info: (message: string) => void
    }
}
declare const _default: () => {
    /**
     * Register phase - runs before bootstrap
     */
    register({ strapi: _strapi }: { strapi: StrapiPluginInstance }): void
    /**
     * Bootstrap phase - runs after all plugins are registered
     */
    bootstrap({ strapi }: { strapi: StrapiPluginInstance }): void
    /**
     * Destroy phase - cleanup
     */
    destroy({ strapi: _strapi }: { strapi: StrapiPluginInstance }): void
    /**
     * Plugin configuration
     */
    config: {
        default: {
            requireAuth: boolean
        }
        validator(config: Record<string, unknown>): void
    }
    /**
     * Controllers
     */
    controllers: {
        schema: ({
            strapi,
        }: {
            strapi: import('./index.js').StrapiInstance
        }) => {
            getSchema(ctx: import('./index.js').StrapiContext): Promise<void>
            getSchemaHash(
                ctx: import('./index.js').StrapiContext,
            ): Promise<void>
            schemaWatch(ctx: import('./index.js').StrapiContext): Promise<void>
        }
    }
    /**
     * Services
     */
    services: {
        schema: ({ strapi }: { strapi: any }) => {
            getAuthMode(): import('../../../shared/strapi-schema-types.js').AuthMode
            extractSchema(): import('./index.js').ExtractedSchema
            getSchema(): import('./index.js').SchemaResponse
            getSchemaHash(): import('./index.js').HashResponse
        }
        endpoints: ({ strapi }: { strapi: any }) => {
            extractExtraTypes(
                strapiDir: string,
            ): import('./services/schema.js').ExtraControllerType[]
            extractRoutesFromFiles(strapiDir: string): {
                endpoints: import('./index.js').ParsedEndpoint[]
                extraTypes: import('./services/schema.js').ExtraControllerType[]
            }
            parseRouteFile(
                filePath: string,
                _apiName: string,
            ): import('./index.js').ParsedEndpoint[]
            extractEndpoints(): import('./index.js').EndpointsResponse
            extractPluginRoutes(
                endpoints: import('./index.js').ParsedEndpoint[],
                pluginName: string,
            ): void
            getEndpointsForApi(
                apiName: string,
            ): import('./index.js').ParsedEndpoint[]
        }
    }
    /**
     * Routes
     */
    routes: {
        'content-api': {
            type: string
            routes: {
                method: string
                path: string
                handler: string
                config: {
                    auth: boolean
                }
            }[]
        }
        admin: {
            type: string
            routes: {
                method: string
                path: string
                handler: string
                config: {
                    policies: never[]
                }
            }[]
        }
    }
}
export default _default
//# sourceMappingURL=index.d.ts.map
