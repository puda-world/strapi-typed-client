/**
 * API client for fetching schema from Strapi backend
 */
import type {
    SchemaResponse,
    HashResponse,
} from '../../shared/strapi-schema-types.js'
export type { SchemaResponse, HashResponse }
export interface ApiClientOptions {
    baseUrl: string
    token?: string
    timeout?: number
}
export declare class ApiClient {
    private baseUrl
    private token?
    private timeout
    constructor(options: ApiClientOptions)
    /** Full URL for the SSE schema-watch endpoint */
    get sseUrl(): string
    /** Build request headers (auth + content-type) */
    getHeaders(): Record<string, string>
    /**
     * Fetch the full schema from Strapi
     */
    getSchema(): Promise<SchemaResponse>
    /**
     * Fetch only the schema hash from Strapi
     */
    getSchemaHash(): Promise<HashResponse>
    /**
     * Check if the Strapi instance is reachable
     */
    ping(): Promise<boolean>
    /**
     * Make a request to the Strapi API
     */
    private request
}
/**
 * Create an API client from environment variables or CLI options
 */
export declare function createApiClient(options: {
    url?: string
    token?: string
    timeout?: number
}): ApiClient
//# sourceMappingURL=api-client.d.ts.map
