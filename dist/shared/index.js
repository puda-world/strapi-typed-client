/**
 * Shared utilities for Strapi Types Generator
 * @module shared
 */
// String manipulation utilities
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
// Naming conventions utilities
export {
    convertComponentName,
    extractCleanName,
    toEndpointName,
    extractRelationTarget,
    toComponentUid,
    extractComponentCategory,
} from './naming-utils.js'
// Schema hashing utilities
export {
    computeSchemaHash,
    schemasMatch,
    shortHash,
    generateSchemaMetadata,
} from './schema-hash.js'
// Constants
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
//# sourceMappingURL=index.js.map
