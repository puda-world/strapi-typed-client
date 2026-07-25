/**
 * Core utilities for Strapi Types Generator
 * @module core
 */
export {
    transformSchema,
    type ExtractedSchema,
    type StrapiAttribute,
    type StrapiContentType,
    type StrapiComponent,
} from './schema-transformer.js'
export {
    convertEndpointsToRoutes,
    convertEndpointsToCustomTypes,
} from './endpoint-converter.js'
export {
    generateFilterUtilityTypes,
    generateEntityFilters,
    generateTypedQueryParams,
} from './generator/filters-generator.js'
//# sourceMappingURL=index.d.ts.map
