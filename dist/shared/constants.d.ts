/**
 * Constants for Strapi Types Generator
 * @module shared/constants
 */
/**
 * System fields that are automatically added to all Strapi content types
 * These are included in output types but not in input types
 */
export declare const SYSTEM_FIELDS: readonly [
    'id',
    'documentId',
    'createdAt',
    'updatedAt',
    'publishedAt',
]
/**
 * Private/internal Strapi fields that should be excluded from generated types
 * These fields are managed by Strapi and not accessible via API
 */
export declare const PRIVATE_FIELDS: readonly ['createdBy', 'updatedBy']
/**
 * All fields to skip when generating entity types
 */
export declare const SKIP_FIELDS: readonly ['createdBy', 'updatedBy']
/**
 * Strapi filter operators
 */
export declare const FILTER_OPERATORS: {
    readonly $eq: 'Equal'
    readonly $eqi: 'Equal (case-insensitive)'
    readonly $ne: 'Not equal'
    readonly $nei: 'Not equal (case-insensitive)'
    readonly $lt: 'Less than'
    readonly $lte: 'Less than or equal'
    readonly $gt: 'Greater than'
    readonly $gte: 'Greater than or equal'
    readonly $in: 'In array'
    readonly $notIn: 'Not in array'
    readonly $null: 'Is null'
    readonly $notNull: 'Is not null'
    readonly $between: 'Between (array of [start, end])'
    readonly $contains: 'Contains substring'
    readonly $notContains: 'Does not contain substring'
    readonly $containsi: 'Contains substring (case-insensitive)'
    readonly $notContainsi: 'Does not contain substring (case-insensitive)'
    readonly $startsWith: 'Starts with'
    readonly $startsWithi: 'Starts with (case-insensitive)'
    readonly $endsWith: 'Ends with'
    readonly $endsWithi: 'Ends with (case-insensitive)'
    readonly $and: 'Logical AND'
    readonly $or: 'Logical OR'
    readonly $not: 'Logical NOT'
}
/**
 * Strapi relation types
 */
export declare const RELATION_TYPES: {
    readonly oneToOne: {
        readonly isArray: false
        readonly nullable: true
    }
    readonly oneToMany: {
        readonly isArray: true
        readonly nullable: false
    }
    readonly manyToOne: {
        readonly isArray: false
        readonly nullable: true
    }
    readonly manyToMany: {
        readonly isArray: true
        readonly nullable: false
    }
    readonly morphToOne: {
        readonly isArray: false
        readonly nullable: true
    }
    readonly morphToMany: {
        readonly isArray: true
        readonly nullable: false
    }
    readonly morphOne: {
        readonly isArray: false
        readonly nullable: true
    }
    readonly morphMany: {
        readonly isArray: true
        readonly nullable: false
    }
}
/**
 * Default HTTP methods for Strapi CRUD operations
 */
export declare const CRUD_METHODS: {
    readonly find: 'GET'
    readonly findOne: 'GET'
    readonly create: 'POST'
    readonly update: 'PUT'
    readonly delete: 'DELETE'
}
/**
 * Package version (injected at build time or read from package.json)
 */
export declare const PACKAGE_NAME = 'strapi-typed-client'
/**
 * Prefix for the plugin's content-api routes. This is the Strapi plugin id
 * (`/api/<plugin-id>/...`), which is not necessarily the npm package name.
 */
export declare const SCHEMA_API_PREFIX = '/api/strapi-typed-client'
//# sourceMappingURL=constants.d.ts.map
