/**
 * Shared utilities for Strapi Types Generator
 * @module shared
 */
export {
    toCamelCase,
    toLowerFirst,
    toPascalCase,
    toKebabCase,
    toSnakeCase,
    capitalize,
    pluralize,
    toPascalCasePreserve,
    extractPathParams,
} from './string-utils.js'
export {
    convertComponentName,
    extractCleanName,
    toEndpointName,
    extractRelationTarget,
    toComponentUid,
    extractComponentCategory,
} from './naming-utils.js'
export {
    computeSchemaHash,
    schemasMatch,
    shortHash,
    generateSchemaMetadata,
} from './schema-hash.js'
export type { SchemaMetadata } from './schema-hash.js'
export type {
    EndpointType,
    ParsedEndpoint,
    ExtraControllerType,
    EndpointsResponse,
} from './endpoint-types.js'
export type {
    StrapiAttribute,
    StrapiContentType,
    StrapiComponent,
    ExtractedSchema,
    SchemaResponse,
    HashResponse,
} from './strapi-schema-types.js'
export {
    SYSTEM_FIELDS,
    PRIVATE_FIELDS,
    SKIP_FIELDS,
    FILTER_OPERATORS,
    RELATION_TYPES,
    CRUD_METHODS,
    PACKAGE_NAME,
    SCHEMA_API_PREFIX,
} from './constants.js'
//# sourceMappingURL=index.d.ts.map
