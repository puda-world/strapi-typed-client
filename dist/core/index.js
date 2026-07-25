/**
 * Core utilities for Strapi Types Generator
 * @module core
 */
// Schema transformation
export { transformSchema } from './schema-transformer.js'
// Endpoint conversion (remote endpoints → generator formats)
export {
    convertEndpointsToRoutes,
    convertEndpointsToCustomTypes,
} from './endpoint-converter.js'
// Filters generation
export {
    generateFilterUtilityTypes,
    generateEntityFilters,
    generateTypedQueryParams,
} from './generator/filters-generator.js'
//# sourceMappingURL=index.js.map
