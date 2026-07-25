import { ParsedSchema } from '../schema-types.js'
import type {
    ParsedEndpoint,
    ExtraControllerType,
} from '../shared/endpoint-types.js'
import type { AuthMode } from '../shared/strapi-schema-types.js'
export declare class Generator {
    private outputDir
    private typesGenerator
    private clientGenerator
    private indexGenerator
    constructor(outputDir: string)
    generate(
        schema: ParsedSchema,
        endpoints?: ParsedEndpoint[],
        extraTypes?: ExtraControllerType[],
        schemaHash?: string,
        generatorVersion?: string,
        format?: 'js' | 'ts',
        typecheck?: boolean,
        authMode?: AuthMode,
    ): Promise<void>
    private ensureOutputDir
    private formatContent
    private compileFiles
    /**
     * Block on the generated client's type errors. Default throws — broken
     * types must never reach the consumer's tree; `--no-typecheck` downgrades
     * to a warning and writes anyway, so a strict-only false positive can't
     * wedge an upgrade with no recourse.
     */
    private verifyGeneratedTypes
    /**
     * Type-check the generated client the way a consumer's tsc would and return
     * a formatted error message, or null if clean. Run from a temp dir on disk
     * so bundler resolution maps the `.js` import specifiers to the sibling
     * `.ts` files — the in-memory emit program can't resolve those, so it can't
     * double as the check. Strict + skipLibCheck mirrors a typical consumer
     * tsconfig.
     */
    private collectTypeErrors
}
//# sourceMappingURL=index.d.ts.map
