import type { EndpointType } from './endpoint-types.js'

export interface ParsedRoute {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    path: string
    handler: string
    controller: string // extracted from handler (e.g., 'item' from 'item.incrementRun')
    action: string // extracted from handler (e.g., 'incrementRun' from 'item.incrementRun')
    params: string[] // extracted from path (e.g., ['id'] from '/items/:id/action')
    types?: EndpointType // optional body/response/path/query types declared by the controller
    pluginName?: string // e.g., 'users-permissions' for plugin routes
    prefix?: string // from config.prefix (undefined = default plugin prefix)
}

export interface ParsedRoutes {
    byController: Map<string, ParsedRoute[]> // grouped by controller name
    all: ParsedRoute[]
}
