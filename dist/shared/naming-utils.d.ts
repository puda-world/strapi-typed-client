/**
 * Naming utilities for Strapi Types Generator
 * Handles conversion of Strapi-specific naming patterns to TypeScript
 * @module shared/naming-utils
 */
/**
 * Convert Strapi component UID to TypeScript interface name
 * @example
 * convertComponentName('shared.feature') // 'SharedFeature'
 * convertComponentName('landing.editor-feature') // 'LandingEditorFeature'
 */
export declare function convertComponentName(component: string): string
/**
 * Extract clean entity name from Strapi API interface name
 * Handles both Api* and Plugin* prefixes
 * @example
 * extractCleanName('ApiItemItem') // 'Item'
 * extractCleanName('ApiCategoryCategory') // 'Category'
 * extractCleanName('PluginUsersPermissionsUser') // 'User'
 * extractCleanName('PluginUsersPermissionsRole') // 'Role'
 */
export declare function extractCleanName(apiName: string): string
/**
 * Convert clean entity name to API endpoint name
 * Follows Strapi's convention of pluralized kebab-case for collections
 * and plain kebab-case for single types
 * @example
 * toEndpointName('Item') // 'items'
 * toEndpointName('SaveGame') // 'save-games'
 * toEndpointName('Category') // 'categories'
 * toEndpointName('Homepage', true) // 'homepage'
 */
export declare function toEndpointName(
    cleanName: string,
    isSingle?: boolean,
): string
/**
 * Extract Strapi relation target to TypeScript type name
 * Handles both API and Plugin relation targets
 * @example
 * extractRelationTarget("'api::item.item'") // 'Item'
 * extractRelationTarget("'plugin::users-permissions.user'") // 'User'
 */
export declare function extractRelationTarget(target: string): string
/**
 * Convert Strapi component category and name to component UID
 * @example
 * toComponentUid('Landing', 'EditorFeature') // 'landing.editor-feature'
 */
export declare function toComponentUid(category: string, name: string): string
/**
 * Extract component category from component name
 * @example
 * extractComponentCategory('landing.editor-feature') // 'landing'
 * extractComponentCategory('shared.seo') // 'shared'
 */
export declare function extractComponentCategory(componentUid: string): string
//# sourceMappingURL=naming-utils.d.ts.map
