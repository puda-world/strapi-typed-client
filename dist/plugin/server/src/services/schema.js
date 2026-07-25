/**
 * Schema service for Strapi Types Plugin
 * Extracts schema information from Strapi and computes hashes for change detection
 */
import { computeSchemaHash } from '../../../../shared/schema-hash.js'
import { SYSTEM_FIELDS, PRIVATE_FIELDS } from '../../../../shared/constants.js'
/**
 * Filter out system attributes that shouldn't be exposed
 */
function filterAttributes(attributes) {
    // Combine system fields (createdAt, updatedAt, publishedAt — added by generator as base fields)
    // and private fields (createdBy, updatedBy)
    const systemFields = [
        ...SYSTEM_FIELDS.filter(f => f !== 'id' && f !== 'documentId'),
        ...PRIVATE_FIELDS,
    ]
    const filtered = {}
    for (const [name, attr] of Object.entries(attributes)) {
        // Skip system fields
        if (systemFields.includes(name)) {
            continue
        }
        // Skip private attributes
        if (attr.private) {
            continue
        }
        // Skip admin relations
        if (attr.type === 'relation') {
            const target = attr.target
            if (target?.startsWith('admin::')) {
                continue
            }
            // Allow users-permissions relations
            if (
                target?.startsWith('plugin::') &&
                !target.includes('users-permissions')
            ) {
                continue
            }
        }
        filtered[name] = attr
    }
    return filtered
}
/**
 * Extract clean content type schema
 */
function extractContentType(ct) {
    const uid = ct.uid
    // Only include API content types and users-permissions
    if (!uid.startsWith('api::') && !uid.includes('users-permissions')) {
        return null
    }
    return {
        uid,
        kind: ct.kind || 'collectionType',
        collectionName: ct.collectionName,
        info: {
            singularName: ct.info?.singularName || '',
            pluralName: ct.info?.pluralName || '',
            displayName: ct.info?.displayName || '',
            description: ct.info?.description,
        },
        attributes: filterAttributes(ct.attributes || {}),
    }
}
/**
 * Extract clean component schema
 */
function extractComponent(component) {
    const uid = component.uid
    return {
        uid,
        category: component.category || uid.split('.')[0],
        info: {
            displayName: component.info?.displayName || '',
            description: component.info?.description,
        },
        attributes: filterAttributes(component.attributes || {}),
    }
}
export default ({ strapi }) => ({
    /**
     * Detect the users-permissions JWT mode (Strapi 5.43+ session flow).
     * Any value other than the explicit 'refresh' opt-in means legacy.
     */
    getAuthMode() {
        const jwtManagement = strapi.config.get(
            'plugin::users-permissions.jwtManagement',
        )
        return jwtManagement === 'refresh' ? 'refresh' : 'legacy'
    },
    /**
     * Extract the complete schema from Strapi
     */
    extractSchema() {
        const contentTypes = {}
        const components = {}
        // Extract content types
        for (const [uid, ct] of Object.entries(strapi.contentTypes)) {
            const extracted = extractContentType(ct)
            if (extracted) {
                contentTypes[uid] = extracted
            }
        }
        // Extract components
        for (const [uid, component] of Object.entries(strapi.components)) {
            const extracted = extractComponent(component)
            if (extracted) {
                components[uid] = extracted
            }
        }
        return { contentTypes, components }
    },
    /**
     * Get the full schema with hash and endpoints
     */
    getSchema() {
        const schema = this.extractSchema()
        // Get endpoints from endpoints service
        let endpoints = []
        let extraTypes = []
        try {
            const endpointsService = strapi
                .plugin('strapi-typed-client')
                .service('endpoints')
            if (endpointsService) {
                const endpointsResult = endpointsService.extractEndpoints()
                endpoints = endpointsResult.endpoints
                extraTypes = endpointsResult.extraTypes || []
            }
        } catch {
            // Endpoints service might not be available, continue without endpoints
        }
        // Separate plugin endpoints from API endpoints
        // Plugin endpoints are used by the generator for correct route prefixing
        // but hidden from the admin panel by default
        const apiEndpoints = endpoints.filter(e => !e.pluginName)
        const pluginEndpoints = endpoints.filter(e => !!e.pluginName)
        const authMode = this.getAuthMode()
        // Include ALL endpoints in hash computation for complete change detection;
        // authMode too, so toggling jwtManagement on the backend regenerates the client
        const hashData = { schema, endpoints, extraTypes, authMode }
        const hash = computeSchemaHash(hashData)
        return {
            schema,
            endpoints: apiEndpoints,
            pluginEndpoints,
            extraTypes,
            authMode,
            hash,
            generatedAt: new Date().toISOString(),
        }
    },
    /**
     * Get only the schema hash (lightweight operation)
     */
    getSchemaHash() {
        const schema = this.extractSchema()
        // Include endpoints and extraTypes in hash computation for consistency with getSchema()
        let endpoints = []
        let extraTypes = []
        try {
            const endpointsService = strapi
                .plugin('strapi-typed-client')
                .service('endpoints')
            if (endpointsService) {
                const endpointsResult = endpointsService.extractEndpoints()
                endpoints = endpointsResult.endpoints
                extraTypes = endpointsResult.extraTypes || []
            }
        } catch {
            // Endpoints service might not be available
        }
        const hashData = {
            schema,
            endpoints,
            extraTypes,
            authMode: this.getAuthMode(),
        }
        const hash = computeSchemaHash(hashData)
        return {
            hash,
            generatedAt: new Date().toISOString(),
        }
    },
})
//# sourceMappingURL=schema.js.map
