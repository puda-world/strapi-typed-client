/**
 * Endpoint Converter
 *
 * Converts ParsedEndpoint[] (from Strapi plugin) to the formats
 * used by the existing generators: ParsedRoutes + ParsedCustomTypes.
 *
 * This bridges the remote schema approach (server plugin) with the
 * existing local file-based generators.
 *
 * @module core/endpoint-converter
 */
import type {
    ParsedEndpoint,
    ExtraControllerType,
} from '../shared/endpoint-types.js'
import type { ParsedRoutes } from '../shared/route-types.js'
import type { ParsedCustomTypes } from '../shared/custom-types.js'
/**
 * Convert ParsedEndpoint[] to ParsedRoutes format
 */
export declare function convertEndpointsToRoutes(
    endpoints: ParsedEndpoint[],
): ParsedRoutes
/**
 * Convert ParsedEndpoint[] to ParsedCustomTypes format
 *
 * Extracts inline type definitions from endpoint types (body/response)
 * and creates handler-to-type mappings.
 *
 * `knownTypeNames` is the set of type names the generated client defines
 * (content-type + component cleanNames, MediaFile, extra controller types) so
 * the sanitizer can tell a resolvable reference from a dangling one.
 */
export declare function convertEndpointsToCustomTypes(
    endpoints: ParsedEndpoint[],
    extraTypes?: ExtraControllerType[],
    knownTypeNames?: Set<string>,
): ParsedCustomTypes
//# sourceMappingURL=endpoint-converter.d.ts.map
