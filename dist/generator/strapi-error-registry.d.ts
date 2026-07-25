/**
 * Declarative registry of Strapi v5 error types and the shape of their
 * `details` payloads.
 *
 * Used by the client generator to emit:
 *   - the `StrapiErrorName` literal union
 *   - the `StrapiErrorDetailsMap` mapped type (keyed by errorName)
 *   - JSDoc on the generated `StrapiError` class
 *
 * Adding a new known error type means appending one entry here. Unknown
 * names still pass through at runtime via the `string` fallback in
 * `StrapiErrorName` and the `UnknownStrapiErrorDetails` type.
 *
 * Pattern parallels `plugin-registry.ts` so that a future OpenAPI-driven
 * pipeline can substitute either registry as a fallback when the
 * `@strapi/plugin-documentation` schema is unavailable.
 */
export interface StrapiErrorContract {
    /** Strapi-side error name, used as the discriminator value. */
    errorName: string
    /** Default HTTP status. Informational — runtime status comes from response. */
    status: number
    /**
     * TypeScript type expression for `details`.
     *
     * Use `'undefined'` for stateless errors so `err.details` is typed as
     * optional/undefined (cleaner DX than `Record<string, never>`).
     */
    detailsType: string
    /** Optional one-line description used as JSDoc on the union arm. */
    description?: string
}
export declare const STRAPI_ERROR_REGISTRY: StrapiErrorContract[]
//# sourceMappingURL=strapi-error-registry.d.ts.map
