/**
 * Endpoints service for Strapi Types Plugin
 * Extracts custom API routes and their types from Strapi
 */
import type {
    EndpointType,
    ParsedEndpoint,
    ExtraControllerType,
    EndpointsResponse,
} from '../../../../shared/endpoint-types.js'
export type {
    EndpointType,
    ParsedEndpoint,
    ExtraControllerType,
    EndpointsResponse,
}
declare const _default: ({ strapi }: { strapi: any }) => {
    /**
     * Extract extra (standalone) exported types from all API controller files.
     * These are types like `export type SSEEvent = ...` that are not part of the Endpoints interface.
     */
    extractExtraTypes(strapiDir: string): ExtraControllerType[]
    /**
     * Extract routes from filesystem (fallback when strapi.api is empty)
     */
    extractRoutesFromFiles(strapiDir: string): {
        endpoints: ParsedEndpoint[]
        extraTypes: ExtraControllerType[]
    }
    /**
     * Parse a route file and extract routes
     */
    parseRouteFile(filePath: string, _apiName: string): ParsedEndpoint[]
    /**
     * Extract all custom API endpoints from Strapi
     */
    extractEndpoints(): EndpointsResponse
    /**
     * Extract routes from a Strapi plugin (e.g., users-permissions)
     * and append them to the endpoints array with pluginName and prefix set.
     */
    extractPluginRoutes(endpoints: ParsedEndpoint[], pluginName: string): void
    /**
     * Get endpoints for a specific API
     */
    getEndpointsForApi(apiName: string): ParsedEndpoint[]
}
export default _default
//# sourceMappingURL=endpoints.d.ts.map
