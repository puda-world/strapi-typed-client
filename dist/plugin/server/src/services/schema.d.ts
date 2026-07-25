/**
 * Schema service for Strapi Types Plugin
 * Extracts schema information from Strapi and computes hashes for change detection
 */
import type {
    ParsedEndpoint,
    ExtraControllerType,
} from '../../../../shared/endpoint-types.js'
import type {
    AuthMode,
    StrapiAttribute,
    StrapiContentType,
    StrapiComponent,
    ExtractedSchema,
    SchemaResponse,
    HashResponse,
} from '../../../../shared/strapi-schema-types.js'
export type {
    StrapiAttribute,
    StrapiContentType,
    StrapiComponent,
    ExtractedSchema,
    SchemaResponse,
    HashResponse,
    ParsedEndpoint,
    ExtraControllerType,
}
declare const _default: ({ strapi }: { strapi: any }) => {
    /**
     * Detect the users-permissions JWT mode (Strapi 5.43+ session flow).
     * Any value other than the explicit 'refresh' opt-in means legacy.
     */
    getAuthMode(): AuthMode
    /**
     * Extract the complete schema from Strapi
     */
    extractSchema(): ExtractedSchema
    /**
     * Get the full schema with hash and endpoints
     */
    getSchema(): SchemaResponse
    /**
     * Get only the schema hash (lightweight operation)
     */
    getSchemaHash(): HashResponse
}
export default _default
//# sourceMappingURL=schema.d.ts.map
