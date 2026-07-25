/**
 * Schema hashing utilities for Strapi Types Generator
 * Used for detecting schema changes and cache invalidation
 * @module shared/schema-hash
 */
/**
 * Compute SHA256 hash of a schema object
 * The schema is normalized (sorted keys) before hashing for deterministic results
 * @param schema Any JSON-serializable schema object
 * @returns Hex-encoded SHA256 hash
 */
export declare function computeSchemaHash(schema: unknown): string
/**
 * Compare two schema hashes
 * @returns true if schemas are identical
 */
export declare function schemasMatch(hash1: string, hash2: string): boolean
/**
 * Generate a short hash (first 8 characters) for display purposes
 * @param hash Full SHA256 hash
 * @returns Short hash suitable for display
 */
export declare function shortHash(hash: string): string
/**
 * Create schema metadata object for inclusion in generated code
 */
export interface SchemaMetadata {
    hash: string
    shortHash: string
    generatedAt: string
    version: string
}
/**
 * Generate schema metadata from a schema object
 * @param schema The parsed schema
 * @param version Package version
 */
export declare function generateSchemaMetadata(
    schema: unknown,
    version: string,
): SchemaMetadata
//# sourceMappingURL=schema-hash.d.ts.map
