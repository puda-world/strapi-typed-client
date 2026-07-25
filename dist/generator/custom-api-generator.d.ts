import { ParsedRoute } from '../shared/route-types.js'
import { ParsedCustomTypes } from '../shared/custom-types.js'
export declare class CustomApiGenerator {
    private customTypes?
    /**
     * Set custom types to use for type generation
     */
    setCustomTypes(customTypes: ParsedCustomTypes): void
    /**
     * Generate custom methods for a specific controller
     * These will be added to the corresponding CollectionAPI class or standalone API class
     * @param controller - Controller name
     * @param routes - Routes for this controller
     * @param isStandalone - Whether this is a standalone API (no collection type)
     * @param endpoint - The collection/single endpoint segment (pluralName for
     *   collections, singularName for single types) — used to strip the leading
     *   resource prefix from route paths. When omitted, falls back to naive
     *   `controller + "s"` pluralization (kept for standalone routes only).
     */
    generateCustomMethods(
        controller: string,
        routes: ParsedRoute[],
        isStandalone?: boolean,
        endpoint?: string,
        contentTypeName?: string,
    ): string
    /**
     * Generate type definitions from API namespace files
     */
    generateTypeDefinitions(): string
    private generateCustomMethod
    private generateMethodParams
    private generatePathExpression
    private generateStandalonePathExpression
}
//# sourceMappingURL=custom-api-generator.d.ts.map
