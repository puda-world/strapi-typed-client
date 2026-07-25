/**
 * Next.js plugin for automatic Strapi type generation.
 *
 * Usage in next.config.ts:
 *
 *   import { withStrapiTypes } from 'strapi-typed-client/next'
 *   export default withStrapiTypes({ output: './src/strapi', format: 'ts' })(nextConfig)
 */
export interface StrapiTypesConfig {
    strapiUrl?: string
    token?: string
    silent?: boolean
    format?: 'js' | 'ts'
    output?: string
    typecheck?: boolean
}
/**
 * Resolve the output dir from config. An explicit `output` is required — the
 * generated client is meant to be committed to the consumer's source tree, not
 * written into node_modules (a reinstall would wipe it). Throws an actionable
 * error when `output` is missing.
 */
export declare function resolveOutputDir(config: StrapiTypesConfig): string
export declare function withStrapiTypes(
    config?: StrapiTypesConfig,
): <T>(nextConfig: T) => T
//# sourceMappingURL=index.d.ts.map
