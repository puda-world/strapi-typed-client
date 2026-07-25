/**
 * Custom type definition for a specific endpoint
 */
export interface CustomEndpointType {
    handler: string
    inputType?: string
    outputType?: string
    paramsType?: string
    queryType?: string
    metaType?: string
}
/**
 * Parsed custom types from API namespace files
 */
export interface ParsedCustomTypes {
    types: Map<string, CustomEndpointType>
    typeDefinitions: string[]
    namespaceImports: string[]
}
//# sourceMappingURL=custom-types.d.ts.map
