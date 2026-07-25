import { ParsedSchema } from '../schema-types.js'
import type {
    ParsedEndpoint,
    ExtraControllerType,
} from '../shared/endpoint-types.js'
import type { AuthMode } from '../shared/strapi-schema-types.js'
export declare const STRINGIFY_QUERY_SOURCE =
    "function stringifyQuery(obj: Record<string, unknown>): string {\n    const pairs: string[] = []\n    for (const key of Object.keys(obj)) {\n        appendEntry(obj[key], key, pairs)\n    }\n    return pairs.join('&')\n}\n\nfunction appendEntry(\n    value: unknown,\n    prefix: string,\n    pairs: string[],\n): void {\n    if (value === null || value === undefined) return\n    if (Array.isArray(value)) {\n        for (let i = 0; i < value.length; i++) {\n            appendEntry(value[i], `${prefix}[${i}]`, pairs)\n        }\n        return\n    }\n    if (value instanceof Date) {\n        pairs.push(`${prefix}=${encodeURIComponent(value.toISOString())}`)\n        return\n    }\n    if (typeof value === 'object') {\n        for (const key of Object.keys(value as Record<string, unknown>)) {\n            appendEntry(\n                (value as Record<string, unknown>)[key],\n                `${prefix}[${key}]`,\n                pairs,\n            )\n        }\n        return\n    }\n    pairs.push(`${prefix}=${encodeURIComponent(String(value))}`)\n}"
export declare class ClientGenerator {
    private authApiGenerator
    private customApiGenerator
    private pluginApiGenerator
    constructor()
    generate(
        schema: ParsedSchema,
        endpoints?: ParsedEndpoint[],
        extraTypes?: ExtraControllerType[],
        schemaHash?: string,
        generatorVersion?: string,
        authMode?: AuthMode,
    ): string
    private generateImports
    private addUtilityTypes
    private addStrapiValidationIssueInterface
    private addStrapiErrorTypes
    private addStrapiErrorClass
    private addStrapiErrorTypeGuards
    private addStrapiConnectionErrorClass
    private generateBaseAPIClass
    private addGetPopulatedType
    private generateCollectionAPI
    private generateSingleTypeAPI
    private generateUsersPermissionsUserAPI
    private generateCustomAPIClasses
    private buildTypeParams
    /**
     * Pick the API class wired for a content type. The users-permissions user
     * is special-cased to the flat-envelope class; everything else uses its
     * custom-route class, SingleTypeAPI, or CollectionAPI.
     */
    private resolveContentTypeApiClass
    /**
     * Compute which entries of `PLUGIN_REGISTRY` should be active for the
     * current generation. An entry is skipped if the user has a custom
     * standalone controller that resolves to the same property name —
     * avoiding both class-name and StrapiClient property collisions. A
     * single warning per skipped entry is logged.
     */
    private computeActivePlugins
    private generateStrapiClient
    /**
     * Resolve the class + property name for a standalone controller (one that
     * does not correspond to a content type).
     *
     * A plugin-route controller can share a name with another content type's
     * pluralName — e.g. the users-permissions plugin's `permissions` controller
     * (which serves /api/users-permissions/permissions) vs a `Permission`
     * content type whose pluralName is `permissions` (which serves
     * /api/permissions). These are two distinct endpoints, and we want both on
     * the client. When this collision occurs, disambiguate the standalone name
     * by prefixing it with the plugin's camelCase name.
     */
    /**
     * Property name for a content type on StrapiClient. `auth` (and its
     * deprecated alias `authentication`) are reserved for the users-permissions
     * namespace, so a content type whose endpoint camelCases to one of those is
     * disambiguated by kind (e.g. a single type `auth` → `authSingle`) to avoid
     * a duplicate-identifier collision with `auth: AuthAPI`.
     */
    private contentTypePropName
    private resolveStandaloneNames
    private buildStandaloneDeclarations
    private buildStandaloneInits
}
//# sourceMappingURL=client-generator.d.ts.map
