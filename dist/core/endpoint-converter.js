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
import {
    extractPathParams,
    toPascalCasePreserve,
} from '../shared/string-utils.js'
/**
 * Convert ParsedEndpoint[] to ParsedRoutes format
 */
export function convertEndpointsToRoutes(endpoints) {
    const byController = new Map()
    const all = []
    for (const endpoint of endpoints) {
        const route = {
            method: endpoint.method,
            path: endpoint.path,
            handler: endpoint.handler,
            controller: endpoint.controller,
            action: endpoint.action,
            params: extractPathParams(endpoint.path),
            ...(endpoint.types && { types: endpoint.types }),
            ...(endpoint.prefix !== undefined && { prefix: endpoint.prefix }),
            ...(endpoint.pluginName && { pluginName: endpoint.pluginName }),
        }
        all.push(route)
        if (!byController.has(route.controller)) {
            byController.set(route.controller, [])
        }
        byController.get(route.controller).push(route)
    }
    return { byController, all }
}
/**
 * TS built-in / global type names that are always valid in a type expression
 * and must never be treated as unresolved. Primitives (string, number, …) are
 * lowercase so they aren't matched by the capitalised-identifier scan.
 */
const TS_BUILTIN_TYPES = new Set([
    'Array',
    'ReadonlyArray',
    'Record',
    'Partial',
    'Required',
    'Readonly',
    'Pick',
    'Omit',
    'Exclude',
    'Extract',
    'NonNullable',
    'Parameters',
    'ReturnType',
    'InstanceType',
    'Awaited',
    'Promise',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'Date',
    'RegExp',
    'Error',
    'Object',
    'String',
    'Number',
    'Boolean',
    'Function',
    'Symbol',
    'BigInt',
    'Uint8Array',
    'ArrayBuffer',
    'Blob',
    'File',
    'FormData',
])
/**
 * Custom-endpoint type strings are scraped verbatim from controller source, so
 * they can reference named types that only exist in the controller's module
 * (imported, never shipped) — emitting those would produce `Cannot find name`
 * errors. Replace any capitalised identifier that isn't a TS built-in or a
 * known generated/local type with `unknown` so the client always compiles.
 * Full cross-module resolution is deferred to the ts-morph Endpoints parser.
 *
 * Heuristic and deliberately conservative: string literals are masked so names
 * inside them are left alone, and identifiers in object-key position (followed
 * by `:`) are treated as keys, not type references. Collects the names it
 * dropped into `unresolved`.
 */
function sanitizeTypeRefs(typeStr, known, unresolved) {
    // Mask string literals ('...' / "...") so identifiers inside them survive.
    const literals = []
    const masked = typeStr.replace(/'[^']*'|"[^"]*"/g, m => {
        literals.push(m)
        return `${literals.length - 1}`
    })
    const scanned = masked.replace(
        /\b[A-Z][A-Za-z0-9_]*\b/g,
        (name, offset, full) => {
            // Skip object keys / labels: identifier immediately followed by `:`.
            if (/^\s*:/.test(full.slice(offset + name.length))) return name
            if (TS_BUILTIN_TYPES.has(name) || known.has(name)) return name
            unresolved.add(name)
            return 'unknown'
        },
    )
    return scanned.replace(/(\d+)/g, (_, i) => literals[Number(i)])
}
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
export function convertEndpointsToCustomTypes(
    endpoints,
    extraTypes,
    knownTypeNames = new Set(),
) {
    const types = new Map()
    const typeDefinitions = []
    const namespaceImports = []
    // Collect all endpoints that have type information
    const endpointsWithTypes = endpoints.filter(e => e.types)
    // Group by controller to create namespace-like structures
    const byController = new Map()
    for (const endpoint of endpointsWithTypes) {
        if (!byController.has(endpoint.controller)) {
            byController.set(endpoint.controller, [])
        }
        byController.get(endpoint.controller).push(endpoint)
    }
    // Group extra types by controller
    const extraByController = new Map()
    if (extraTypes) {
        for (const extra of extraTypes) {
            if (!extraByController.has(extra.controller)) {
                extraByController.set(extra.controller, [])
            }
            extraByController.get(extra.controller).push(extra)
        }
    }
    // Collect all controller names that need namespaces (from endpoints or extra types)
    const allControllers = new Set([
        ...byController.keys(),
        ...extraByController.keys(),
    ])
    if (allControllers.size === 0) {
        return { types, typeDefinitions, namespaceImports }
    }
    // Generate type definitions for each controller
    for (const controller of allControllers) {
        const namespaceName = toPascalCasePreserve(controller) + 'API'
        const namespaceLines = []
        namespaceLines.push(`export namespace ${namespaceName} {`)
        const controllerExtraTypes = extraByController.get(controller)
        const controllerEndpoints = byController.get(controller)
        // Names this namespace itself defines — added to the known set so a
        // reference to a sibling type in the same namespace isn't mistaken for
        // an unresolved one by the sanitizer.
        const ownNames = new Set()
        if (controllerExtraTypes) {
            for (const extra of controllerExtraTypes)
                ownNames.add(extra.typeName)
        }
        if (controllerEndpoints) {
            for (const endpoint of controllerEndpoints) {
                if (!endpoint.types) continue
                const ap = toPascalCasePreserve(endpoint.action)
                if (endpoint.types.body) ownNames.add(`${ap}Request`)
                if (endpoint.types.response) ownNames.add(`${ap}Response`)
                if (endpoint.types.params) ownNames.add(`${ap}Params`)
                if (endpoint.types.query) ownNames.add(`${ap}Query`)
                if (endpoint.types.meta) ownNames.add(`${ap}Meta`)
            }
        }
        const nsKnown = new Set([...knownTypeNames, ...ownNames])
        const unresolved = new Set()
        // Add extra (standalone) types first
        if (controllerExtraTypes) {
            for (const extra of controllerExtraTypes) {
                namespaceLines.push(
                    `  export type ${extra.typeName} = ${sanitizeTypeRefs(extra.typeDefinition, nsKnown, unresolved)}`,
                )
            }
        }
        // Add endpoint-derived types
        if (controllerEndpoints) {
            for (const endpoint of controllerEndpoints) {
                if (!endpoint.types) continue
                const actionPascal = toPascalCasePreserve(endpoint.action)
                // Generate Request type from body
                if (endpoint.types.body) {
                    const typeName = `${actionPascal}Request`
                    namespaceLines.push(
                        `  export type ${typeName} = ${sanitizeTypeRefs(endpoint.types.body, nsKnown, unresolved)}`,
                    )
                    // Map handler to input type
                    const existing = types.get(endpoint.handler) || {
                        handler: endpoint.handler,
                    }
                    existing.inputType = `${namespaceName}.${typeName}`
                    types.set(endpoint.handler, existing)
                }
                // Generate Response type from response
                if (endpoint.types.response) {
                    const typeName = `${actionPascal}Response`
                    // Unwrap { data: ... } wrapper — StrapiClient already does response.data
                    const unwrappedResponse = unwrapDataWrapper(
                        endpoint.types.response,
                    )
                    namespaceLines.push(
                        `  export type ${typeName} = ${sanitizeTypeRefs(unwrappedResponse, nsKnown, unresolved)}`,
                    )
                    // Map handler to output type
                    const existing = types.get(endpoint.handler) || {
                        handler: endpoint.handler,
                    }
                    existing.outputType = `${namespaceName}.${typeName}`
                    types.set(endpoint.handler, existing)
                }
                if (endpoint.types.params) {
                    const typeName = `${actionPascal}Params`
                    namespaceLines.push(
                        `  export type ${typeName} = ${sanitizeTypeRefs(endpoint.types.params, nsKnown, unresolved)}`,
                    )
                    const existing = types.get(endpoint.handler) || {
                        handler: endpoint.handler,
                    }
                    existing.paramsType = `${namespaceName}.${typeName}`
                    types.set(endpoint.handler, existing)
                }
                if (endpoint.types.query) {
                    const typeName = `${actionPascal}Query`
                    namespaceLines.push(
                        `  export type ${typeName} = ${sanitizeTypeRefs(endpoint.types.query, nsKnown, unresolved)}`,
                    )
                    const existing = types.get(endpoint.handler) || {
                        handler: endpoint.handler,
                    }
                    existing.queryType = `${namespaceName}.${typeName}`
                    types.set(endpoint.handler, existing)
                }
                if (endpoint.types.meta) {
                    const typeName = `${actionPascal}Meta`
                    namespaceLines.push(
                        `  export type ${typeName} = ${sanitizeTypeRefs(endpoint.types.meta, nsKnown, unresolved)}`,
                    )
                    const existing = types.get(endpoint.handler) || {
                        handler: endpoint.handler,
                    }
                    existing.metaType = `${namespaceName}.${typeName}`
                    types.set(endpoint.handler, existing)
                }
            }
        }
        // If any referenced name couldn't be resolved we degraded it to
        // `unknown` — leave a discoverable note in the committed output. Full
        // cross-module resolution is deferred to the ts-morph Endpoints parser.
        if (unresolved.size > 0) {
            namespaceLines.splice(
                1,
                0,
                `  // NOTE: ${[...unresolved].sort().join(', ')} could not be resolved from the schema and fall back to \`unknown\` (custom-endpoint types referencing controller-local types).`,
            )
        }
        namespaceLines.push('}')
        // Only add namespace if it has real content (open + close, plus an
        // optional NOTE, is empty).
        const minLines = unresolved.size > 0 ? 3 : 2
        if (namespaceLines.length > minLines) {
            typeDefinitions.push(namespaceLines.join('\n'))
            namespaceImports.push(namespaceName)
        }
    }
    return { types, typeDefinitions, namespaceImports }
}
/**
 * Unwrap { data: ... } wrapper from response types.
 *
 * Controllers return { data: { ... } } but StrapiClient already
 * does `response.data`, so the type should be the inner content.
 *
 * Examples:
 *   '{ data: { url: string } }' → '{ url: string }'
 *   '{ data: { members: Array<...>, maxSeats: number } }' → '{ members: Array<...>, maxSeats: number }'
 *   'void' → 'void'
 *   '{ status: string }' → '{ status: string }' (no data wrapper)
 */
function unwrapDataWrapper(responseType) {
    const trimmed = responseType.trim()
    // Match pattern: { data: <content> } where content is the rest
    // Use balanced braces to find the outer object
    if (!trimmed.startsWith('{')) return trimmed
    // Check if this is a simple { data: ... } wrapper
    const dataMatch = trimmed.match(/^\{\s*data\s*:\s*/)
    if (!dataMatch) return trimmed
    // Extract content after "{ data: "
    const afterData = trimmed.slice(dataMatch[0].length)
    // Find the matching closing brace for the outer object
    // We need to remove the last } which closes the outer wrapper
    if (afterData.endsWith('}')) {
        const innerContent = afterData.slice(0, -1).trim()
        // Remove trailing semicolons if present
        return innerContent.replace(/;\s*$/, '').trim()
    }
    return trimmed
}
//# sourceMappingURL=endpoint-converter.js.map
