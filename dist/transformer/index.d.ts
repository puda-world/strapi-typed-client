import { AttributeType } from '../schema-types.js'
export declare class TypeTransformer {
    /**
     * Converts Strapi attribute type to TypeScript type string
     */
    toTypeScript(attrType: AttributeType, required: boolean): string
    private getBaseType
    private getRelationType
    private isAlwaysRequired
    /**
     * Converts API type to collection endpoint name
     * ApiItemItem -> 'items'
     * ApiCatalogCatalog -> 'catalog' (if single type)
     */
    toEndpointName(cleanName: string, isSingle: boolean): string
}
//# sourceMappingURL=index.d.ts.map
