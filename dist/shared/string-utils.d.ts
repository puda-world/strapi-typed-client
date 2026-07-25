/**
 * String manipulation utilities for Strapi Types Generator
 * @module shared/string-utils
 */
/**
 * Convert kebab-case or snake_case to camelCase
 * @example
 * toCamelCase('forgot-password') // 'forgotPassword'
 * toCamelCase('create_item') // 'createItem'
 */
export declare function toCamelCase(str: string): string
/**
 * Convert first character to lowercase (for method names)
 * @example
 * toLowerFirst('CreateCheckout') // 'createCheckout'
 * toLowerFirst('UpdateCode') // 'updateCode'
 */
export declare function toLowerFirst(str: string): string
/**
 * Convert kebab-case or snake_case to PascalCase
 * @example
 * toPascalCase('team-invitation') // 'TeamInvitation'
 * toPascalCase('custom-upload') // 'CustomUpload'
 */
export declare function toPascalCase(str: string): string
/**
 * Convert PascalCase or camelCase to kebab-case
 * @example
 * toKebabCase('TeamInvitation') // 'team-invitation'
 * toKebabCase('customUpload') // 'custom-upload'
 */
export declare function toKebabCase(str: string): string
/**
 * Convert PascalCase or camelCase to snake_case
 * @example
 * toSnakeCase('TeamInvitation') // 'team_invitation'
 * toSnakeCase('customUpload') // 'custom_upload'
 */
export declare function toSnakeCase(str: string): string
/**
 * Capitalize first letter of a string
 * @example
 * capitalize('hello') // 'Hello'
 */
export declare function capitalize(str: string): string
/**
 * Convert kebab-case or snake_case to PascalCase, preserving known abbreviations
 * @example
 * toPascalCasePreserve('ai-studio') // 'AIStudio'
 * toPascalCasePreserve('team-invitation') // 'TeamInvitation'
 */
export declare function toPascalCasePreserve(str: string): string
/**
 * Extract path parameters from a URL path
 * @example
 * extractPathParams('/items/:id/action') // ['id']
 * extractPathParams('/auth/:provider/callback') // ['provider']
 */
export declare function extractPathParams(routePath: string): string[]
/**
 * Simple English pluralization
 * @example
 * pluralize('item') // 'items'
 * pluralize('category') // 'categories'
 * pluralize('boss') // 'bosses'
 */
export declare function pluralize(word: string): string
//# sourceMappingURL=string-utils.d.ts.map
