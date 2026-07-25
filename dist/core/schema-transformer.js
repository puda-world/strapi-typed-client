/**
 * Schema Transformer
 *
 * Converts Strapi plugin's JSON schema (ExtractedSchema) to ParsedSchema
 * used by the TypeScript generators.
 *
 * This enables the CLI to generate types directly from Strapi runtime schema
 * without parsing .d.ts files.
 *
 * @module core/schema-transformer
 */
import {
    toPascalCase,
    convertComponentName,
    extractComponentCategory,
} from '../shared/index.js'
/**
 * Transform Strapi plugin schema to ParsedSchema format
 */
export function transformSchema(extracted) {
    const contentTypes = []
    const components = []
    // Sort by UID for a stable canonical order (Strapi registry order isn't
    // guaranteed stable, which otherwise produces ordering-only diff noise)
    // Transform components first (they may be referenced by content types)
    for (const [uid, strapiComponent] of Object.entries(
        extracted.components,
    ).sort(([a], [b]) => byUid(a, b))) {
        const component = transformComponent(uid, strapiComponent)
        components.push(component)
    }
    // Transform content types
    for (const [uid, strapiContentType] of Object.entries(
        extracted.contentTypes,
    ).sort(([a], [b]) => byUid(a, b))) {
        const contentType = transformContentType(uid, strapiContentType)
        contentTypes.push(contentType)
    }
    return { contentTypes, components }
}
/**
 * Deterministic, locale-independent UID comparator (codepoint order).
 */
function byUid(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
}
/**
 * Transform a single Strapi content type to ParsedSchema ContentType
 */
function transformContentType(uid, ct) {
    const cleanName = extractCleanNameFromUid(uid)
    const kind = ct.kind === 'singleType' ? 'single' : 'collection'
    const attributes = []
    const relations = []
    const media = []
    const componentFields = []
    const dynamicZones = []
    // Process attributes
    for (const [attrName, attr] of Object.entries(ct.attributes)) {
        const result = processAttribute(attrName, attr)
        if (!result) continue
        switch (result.category) {
            case 'attribute':
                attributes.push(result.data)
                break
            case 'relation':
                relations.push(result.data)
                break
            case 'media':
                media.push(result.data)
                break
            case 'component':
                componentFields.push(result.data)
                break
            case 'dynamiczone':
                dynamicZones.push(result.data)
                break
        }
    }
    // Detect plugin content types from uid
    const pluginName = uid.startsWith('plugin::')
        ? uid.split('::')[1].split('.')[0] // e.g., 'users-permissions'
        : undefined
    return {
        name: uidToInterfaceName(uid),
        cleanName,
        collectionName: ct.collectionName,
        singularName: ct.info.singularName,
        pluralName: ct.info.pluralName,
        kind,
        pluginName,
        attributes,
        relations,
        media,
        components: componentFields,
        dynamicZones,
    }
}
/**
 * Transform a single Strapi component to ParsedSchema Component
 */
function transformComponent(uid, comp) {
    const cleanName = convertComponentName(uid)
    const category = extractComponentCategory(uid)
    const attributes = []
    const relations = []
    const media = []
    const componentFields = []
    const dynamicZones = []
    // Process attributes
    for (const [attrName, attr] of Object.entries(comp.attributes)) {
        const result = processAttribute(attrName, attr)
        if (!result) continue
        switch (result.category) {
            case 'attribute':
                attributes.push(result.data)
                break
            case 'relation':
                relations.push(result.data)
                break
            case 'media':
                media.push(result.data)
                break
            case 'component':
                componentFields.push(result.data)
                break
            case 'dynamiczone':
                dynamicZones.push(result.data)
                break
        }
    }
    return {
        name: cleanName,
        cleanName,
        category,
        uid,
        attributes,
        relations,
        media,
        components: componentFields,
        dynamicZones,
    }
}
function processAttribute(name, attr) {
    const required = attr.required ?? false
    // Handle relation
    if (attr.type === 'relation') {
        const target = attr.target || ''
        const relationType = normalizeRelationType(attr.relation || '')
        // Skip admin and non-users-permissions plugin relations
        if (target.startsWith('admin::')) return null
        if (
            target.startsWith('plugin::') &&
            !target.includes('users-permissions')
        ) {
            return null
        }
        return {
            category: 'relation',
            data: {
                name,
                relationType,
                target,
                targetType: extractCleanNameFromUid(target),
                required,
            },
        }
    }
    // Handle media
    if (attr.type === 'media') {
        return {
            category: 'media',
            data: {
                name,
                multiple: attr.multiple ?? false,
                required,
            },
        }
    }
    // Handle component
    if (attr.type === 'component') {
        const componentUid = attr.component || ''
        return {
            category: 'component',
            data: {
                name,
                component: componentUid,
                componentType: convertComponentName(componentUid),
                repeatable: attr.repeatable ?? false,
                required,
            },
        }
    }
    // Handle dynamic zone
    if (attr.type === 'dynamiczone') {
        const componentUids = attr.components || []
        return {
            category: 'dynamiczone',
            data: {
                name,
                components: componentUids,
                componentTypes: componentUids.map(c => convertComponentName(c)),
                required,
            },
        }
    }
    // Handle scalar types
    const attrType = mapStrapiType(attr)
    if (!attrType) return null
    const constraints = extractConstraints(attr)
    return {
        category: 'attribute',
        data: {
            name,
            type: attrType,
            required,
            ...(attr.unique === true ? { unique: true } : {}),
            ...(attr.default !== undefined
                ? { defaultValue: attr.default }
                : {}),
            ...(constraints ? { constraints } : {}),
        },
    }
}
/**
 * Pull validation constraints off a scalar attribute. Returns undefined when
 * the attribute declares none, to avoid empty objects in the IR.
 */
function extractConstraints(attr) {
    const constraints = {}
    if (typeof attr.min === 'number') constraints.min = attr.min
    if (typeof attr.max === 'number') constraints.max = attr.max
    if (typeof attr.minLength === 'number')
        constraints.minLength = attr.minLength
    if (typeof attr.maxLength === 'number')
        constraints.maxLength = attr.maxLength
    if (typeof attr.regex === 'string') constraints.regex = attr.regex
    return Object.keys(constraints).length > 0 ? constraints : undefined
}
/**
 * Map Strapi attribute type to AttributeType
 */
function mapStrapiType(attr) {
    switch (attr.type) {
        case 'string':
            return { kind: 'string' }
        case 'text':
            return { kind: 'text' }
        case 'richtext':
            return { kind: 'richtext' }
        case 'blocks':
            return { kind: 'blocks' }
        case 'email':
            return { kind: 'email' }
        case 'password':
            return null // passwords are never returned by Strapi API
        case 'uid':
            return { kind: 'string' }
        case 'integer':
            return { kind: 'integer' }
        case 'biginteger':
            return { kind: 'biginteger' }
        case 'float':
            return { kind: 'float' }
        case 'decimal':
            return { kind: 'decimal' }
        case 'boolean':
            return { kind: 'boolean' }
        case 'date':
            return { kind: 'date' }
        case 'time':
            return { kind: 'time' }
        case 'datetime':
        case 'timestamp':
            return { kind: 'datetime' }
        case 'json':
            return { kind: 'json' }
        case 'enumeration':
            return { kind: 'enumeration', values: attr.enum || [] }
        default:
            // Unknown type, skip it
            return null
    }
}
/**
 * Normalize Strapi relation type names
 */
function normalizeRelationType(relation) {
    const normalized = relation.toLowerCase().replace(/[^a-z]/g, '')
    switch (normalized) {
        case 'onetoone':
            return 'oneToOne'
        case 'onetomany':
            return 'oneToMany'
        case 'manytoone':
            return 'manyToOne'
        case 'manytomany':
            return 'manyToMany'
        default:
            // Default to manyToOne for unknown relation types
            return 'manyToOne'
    }
}
/**
 * Extract clean name from Strapi UID
 *
 * @example
 * extractCleanNameFromUid('api::item.item') // 'Item'
 * extractCleanNameFromUid('api::guide-type.guide-type') // 'GuideType'
 * extractCleanNameFromUid('plugin::users-permissions.user') // 'User'
 * extractCleanNameFromUid('shared.feature') // 'SharedFeature' (component)
 */
function extractCleanNameFromUid(uid) {
    // Handle component UIDs (no :: prefix)
    if (!uid.includes('::')) {
        return convertComponentName(uid)
    }
    // Handle plugin types
    if (uid.startsWith('plugin::')) {
        const afterPlugin = uid.split('::')[1] // 'users-permissions.user'
        const modelName = afterPlugin.split('.').pop() || afterPlugin
        return toPascalCase(modelName)
    }
    // Handle API types
    if (uid.startsWith('api::')) {
        const afterApi = uid.split('::')[1] // 'item.item' or 'guide-type.guide-type'
        const modelName = afterApi.split('.').pop() || afterApi
        return toPascalCase(modelName)
    }
    // Fallback
    const parts = uid.split('.')
    return toPascalCase(parts[parts.length - 1] || uid)
}
/**
 * Convert UID to interface name (legacy format)
 *
 * @example
 * uidToInterfaceName('api::item.item') // 'ApiItemItem'
 * uidToInterfaceName('plugin::users-permissions.user') // 'PluginUsersPermissionsUser'
 */
function uidToInterfaceName(uid) {
    // Remove :: and . then PascalCase each part
    return uid
        .split(/[:.]+/)
        .filter(Boolean)
        .map(part => toPascalCase(part))
        .join('')
}
//# sourceMappingURL=schema-transformer.js.map
