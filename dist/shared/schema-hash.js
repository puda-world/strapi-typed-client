/**
 * Schema hashing utilities for Strapi Types Generator
 * Used for detecting schema changes and cache invalidation
 * @module shared/schema-hash
 */
import * as crypto from 'crypto'
/**
 * Normalize and sort object keys recursively for deterministic serialization
 */
function normalizeObject(obj) {
    if (obj === null || obj === undefined) {
        return obj
    }
    if (Array.isArray(obj)) {
        return obj.map(normalizeObject)
    }
    if (typeof obj === 'object') {
        const sorted = {}
        const keys = Object.keys(obj).sort()
        for (const key of keys) {
            sorted[key] = normalizeObject(obj[key])
        }
        return sorted
    }
    return obj
}
/**
 * Compute SHA256 hash of a schema object
 * The schema is normalized (sorted keys) before hashing for deterministic results
 * @param schema Any JSON-serializable schema object
 * @returns Hex-encoded SHA256 hash
 */
export function computeSchemaHash(schema) {
    const normalized = normalizeObject(schema)
    const json = JSON.stringify(normalized)
    return crypto.createHash('sha256').update(json).digest('hex')
}
/**
 * Compare two schema hashes
 * @returns true if schemas are identical
 */
export function schemasMatch(hash1, hash2) {
    return hash1 === hash2
}
/**
 * Generate a short hash (first 8 characters) for display purposes
 * @param hash Full SHA256 hash
 * @returns Short hash suitable for display
 */
export function shortHash(hash) {
    return hash.substring(0, 8)
}
/**
 * Generate schema metadata from a schema object
 * @param schema The parsed schema
 * @param version Package version
 */
export function generateSchemaMetadata(schema, version) {
    const hash = computeSchemaHash(schema)
    return {
        hash,
        shortHash: shortHash(hash),
        generatedAt: new Date().toISOString(),
        version,
    }
}
//# sourceMappingURL=schema-hash.js.map
