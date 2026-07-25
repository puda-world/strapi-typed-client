import { ParsedSchema } from '../schema-types.js'
export declare class TypesGenerator {
    private transformer
    private schema?
    constructor()
    generate(schema: ParsedSchema): string
    private generateBaseTypes
    private generateHelperTypes
    private docsFor
    private addDefaultsConst
    private addComponentInterface
    private addComponentDzAlias
    private addComponentDzInputAliases
    private collectDzComponentUids
    private addComponentInputInterfaces
    /**
     * Shared property list for `*CreateInput` / `*UpdateInput`. In create mode a
     * required *scalar* drops its `?` (and `| null`); update mode is fully
     * partial (every key optional). Required-ness is enforced for scalars only —
     * Strapi does not validate `required` on relations/media/components at the
     * REST layer, so forcing those keys would reject payloads it accepts.
     * Components / dynamic zones still split so their nested required scalars
     * are enforced in the Create variant.
     */
    private buildInputProperties
    private addContentTypeInterface
    private addInputTypeInterfaces
    private addPopulateParams
    private buildPopulateParamTypeBody
    private addPayloadUtilityTypes
    private buildGetPayloadType
    /**
     * Build fields for populate: '*' | true — all populatable fields with base types
     */
    private buildAllPopulatedFields
    /**
     * Build fields for array-style populate (e.g. populate: ['category', 'image'])
     */
    private buildArrayPopulatedFields
    /**
     * Build per-field conditional populate for object-style populate params
     */
    private buildPerFieldPopulate
    private hasAnyPopulatableFields
    /**
     * Check if a type (by name) has populatable fields (relations, media, components, or dynamic zones)
     */
    private hasPopulatableFields
}
//# sourceMappingURL=types-generator.d.ts.map
