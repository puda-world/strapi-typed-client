/**
 * API client for fetching schema from Strapi backend
 */
import { SCHEMA_API_PREFIX } from '../../shared/index.js'
export class ApiClient {
    baseUrl
    token
    timeout
    constructor(options) {
        this.baseUrl = options.baseUrl.replace(/\/$/, '')
        this.token = options.token
        this.timeout = options.timeout || 30000
    }
    /** Full URL for the SSE schema-watch endpoint */
    get sseUrl() {
        return `${this.baseUrl}${SCHEMA_API_PREFIX}/schema-watch`
    }
    /** Build request headers (auth + content-type) */
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        }
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`
        }
        return headers
    }
    /**
     * Fetch the full schema from Strapi
     */
    async getSchema() {
        const response = await this.request(`${SCHEMA_API_PREFIX}/schema`)
        return response
    }
    /**
     * Fetch only the schema hash from Strapi
     */
    async getSchemaHash() {
        const response = await this.request(`${SCHEMA_API_PREFIX}/schema-hash`)
        return response
    }
    /**
     * Check if the Strapi instance is reachable
     */
    async ping() {
        try {
            await this.getSchemaHash()
            return true
        } catch {
            return false
        }
    }
    /**
     * Make a request to the Strapi API
     */
    async request(path) {
        const url = `${this.baseUrl}${path}`
        const headers = this.getHeaders()
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), this.timeout)
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers,
                signal: controller.signal,
            })
            if (!response.ok) {
                const error = await response.text()
                throw new Error(
                    `API request failed: ${response.status} ${response.statusText}\n${error}`,
                )
            }
            return response.json()
        } finally {
            clearTimeout(timeoutId)
        }
    }
}
/**
 * Create an API client from environment variables or CLI options
 */
export function createApiClient(options) {
    const baseUrl =
        options.url || process.env.STRAPI_URL || 'http://localhost:1337'
    const token = options.token || process.env.STRAPI_TOKEN
    return new ApiClient({
        baseUrl,
        token,
        timeout: options.timeout,
    })
}
//# sourceMappingURL=api-client.js.map
