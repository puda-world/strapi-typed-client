/**
 * Configuration for Strapi Types Plugin
 */
declare const _default: {
    default: {
        /**
         * Whether authentication is required to access schema endpoints
         * By default: false in development, true in production
         *
         * Can be overridden in config/plugins.ts:
         * @example
         * ```typescript
         * export default {
         *   'strapi-types': {
         *     enabled: true,
         *     config: {
         *       requireAuth: false, // Allow unauthenticated access
         *     },
         *   },
         * }
         * ```
         */
        requireAuth: boolean
    }
    /**
     * Validator for plugin configuration
     */
    validator(config: Record<string, unknown>): void
}
export default _default
//# sourceMappingURL=index.d.ts.map
