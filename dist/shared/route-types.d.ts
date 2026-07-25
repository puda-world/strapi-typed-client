import type { EndpointType } from './endpoint-types.js'
export interface ParsedRoute {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    path: string
    handler: string
    controller: string
    action: string
    params: string[]
    types?: EndpointType
    pluginName?: string
    prefix?: string
}
export interface ParsedRoutes {
    byController: Map<string, ParsedRoute[]>
    all: ParsedRoute[]
}
//# sourceMappingURL=route-types.d.ts.map
