/**
 * Schema Transformer
 *
 * Converts Strapi plugin's JSON schema (ExtractedSchema) to ParsedSchema
 * used by the TypeScript generators.
 *
 * This enables the CLI to generate types directly from Strapi runtime schema
 * without parsing .d.ts files.
 *
 * @module core/schema-transformer
 */
import type { ParsedSchema } from '../schema-types.js'
import type {
    StrapiAttribute,
    StrapiContentType,
    StrapiComponent,
    ExtractedSchema,
} from '../shared/strapi-schema-types.js'
export type {
    StrapiAttribute,
    StrapiContentType,
    StrapiComponent,
    ExtractedSchema,
}
/**
 * Transform Strapi plugin schema to ParsedSchema format
 */
export declare function transformSchema(
    extracted: ExtractedSchema,
): ParsedSchema
//# sourceMappingURL=schema-transformer.d.ts.map
