/**
 * Filters Generator
 * Generates type-safe filter interfaces for Strapi entities
 */
import { ParsedSchema, ContentType } from '../../schema-types.js'
/**
 * Generate filter utility types (static block)
 */
export declare function generateFilterUtilityTypes(): string
/**
 * Generate filter interface for a single content type
 */
export declare function generateEntityFilters(ct: ContentType): string
/**
 * Generate all filter interfaces for the schema
 */
export declare function generateAllFilters(schema: ParsedSchema): string
/**
 * Generate typed QueryParams interface (static block)
 */
export declare function generateTypedQueryParams(): string
//# sourceMappingURL=filters-generator.d.ts.map
