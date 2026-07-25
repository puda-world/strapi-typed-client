/**
 * Declarative registry of Strapi plugin content-API contracts.
 *
 * Each entry describes a plugin and the endpoints it exposes. The
 * `PluginApiGenerator` consumes this registry to emit typed standalone API
 * classes on `StrapiClient` (e.g. `client.upload`).
 *
 * To add support for a new CRUD-style plugin, append a `PluginContract` here.
 * No other code changes are required — generation, property declaration, and
 * init wiring all flow from this registry.
 *
 * Auth (users-permissions) is intentionally NOT in the registry: it has
 * non-CRUD endpoints (OAuth callback, forgot/reset/change password,
 * me/updateMe with populate inference) that don't fit the declarative shape.
 * It stays in `auth-api-generator.ts`.
 */
export const PLUGIN_REGISTRY = [
    {
        pluginName: 'upload',
        clientProperty: 'upload',
        className: 'UploadAPI',
        errorPrefix: 'Strapi Upload',
        endpoints: [
            {
                methodName: 'upload',
                method: 'POST',
                path: '/upload',
                bodyType: 'FormData',
                responseType: 'MediaFile[]',
                description:
                    'Upload one or more files. Pass FormData with field "files".',
            },
            {
                methodName: 'find',
                method: 'GET',
                path: '/upload/files',
                queryType: 'UploadQueryParams',
                responseType: 'MediaFile[]',
                description:
                    'List uploaded files. Supports filters/sort and flat start/limit pagination.',
            },
            {
                methodName: 'findOne',
                method: 'GET',
                path: '/upload/files/:id',
                paramTypes: { id: 'number' },
                responseType: 'MediaFile',
                description: 'Get a single uploaded file by numeric id.',
            },
            {
                methodName: 'delete',
                deprecatedAlias: 'destroy',
                method: 'DELETE',
                path: '/upload/files/:id',
                paramTypes: { id: 'number' },
                responseType: 'MediaFile',
                description:
                    'Delete an uploaded file by numeric id. Returns the deleted file.',
            },
        ],
    },
]
//# sourceMappingURL=plugin-registry.js.map
