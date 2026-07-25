import { PluginContract } from './plugin-registry.js'
/**
 * Generates standalone API classes for Strapi plugins listed in
 * `PLUGIN_REGISTRY`. Each contract becomes a `class XxxAPI extends BaseAPI`
 * with one method per endpoint.
 *
 * Pattern parallels `AuthApiGenerator` — the output is plain TypeScript
 * source assembled via template literals. Body/URL/options shapes are
 * derived declaratively from each `PluginEndpoint`.
 */
export declare class PluginApiGenerator {
    /**
     * Generate the block of plugin API classes for the supplied contracts.
     * Defaults to all entries in `PLUGIN_REGISTRY`. Caller passes a filtered
     * list to skip contracts whose `clientProperty` collides with a
     * user-defined standalone controller.
     */
    generateAllPluginClasses(contracts?: PluginContract[]): string
    private generatePluginClass
    private generateMethod
    /** Argument names (no types) for delegating to the renamed method. */
    private buildArgNames
    private buildParameters
    private buildUrlLines
    private buildRequestOptions
    private buildDocComment
}
//# sourceMappingURL=plugin-api-generator.d.ts.map
