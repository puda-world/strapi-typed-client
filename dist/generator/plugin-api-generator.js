import { PLUGIN_REGISTRY } from './plugin-registry.js'
/**
 * Generates standalone API classes for Strapi plugins listed in
 * `PLUGIN_REGISTRY`. Each contract becomes a `class XxxAPI extends BaseAPI`
 * with one method per endpoint.
 *
 * Pattern parallels `AuthApiGenerator` — the output is plain TypeScript
 * source assembled via template literals. Body/URL/options shapes are
 * derived declaratively from each `PluginEndpoint`.
 */
export class PluginApiGenerator {
    /**
     * Generate the block of plugin API classes for the supplied contracts.
     * Defaults to all entries in `PLUGIN_REGISTRY`. Caller passes a filtered
     * list to skip contracts whose `clientProperty` collides with a
     * user-defined standalone controller.
     */
    generateAllPluginClasses(contracts = PLUGIN_REGISTRY) {
        return contracts
            .map(contract => this.generatePluginClass(contract))
            .join('\n\n')
    }
    generatePluginClass(contract) {
        const methods = contract.endpoints
            .map(ep => this.generateMethod(ep, contract.errorPrefix))
            .join('\n\n')
        return `// API for "${contract.pluginName}" plugin
class ${contract.className} extends BaseAPI {
  constructor(config: StrapiClientConfig) {
    super(config)
  }

${methods}
}`
    }
    generateMethod(ep, errorPrefix) {
        const params = this.buildParameters(ep)
        const urlLines = this.buildUrlLines(ep)
        const reqOptions = this.buildRequestOptions(ep)
        const docComment = this.buildDocComment(ep)
        const indentedUrl = urlLines.map(line => `    ${line}`).join('\n')
        const method = `${docComment}
  async ${ep.methodName}(${params}): Promise<${ep.responseType}> {
${indentedUrl}
    return this.request<${ep.responseType}>(url, ${reqOptions}, nextOptions, '${errorPrefix}')
  }`
        if (!ep.deprecatedAlias) return method
        return `${method}

  /**
   * @deprecated Use \`${ep.methodName}()\` instead. Will be removed in a future major.
   */
  async ${ep.deprecatedAlias}(${params}): Promise<${ep.responseType}> {
    return this.${ep.methodName}(${this.buildArgNames(ep)})
  }`
    }
    /** Argument names (no types) for delegating to the renamed method. */
    buildArgNames(ep) {
        const names = []
        if (ep.paramTypes) names.push(...Object.keys(ep.paramTypes))
        if (ep.bodyType) names.push('body')
        if (ep.queryType) names.push('params')
        names.push('nextOptions')
        return names.join(', ')
    }
    buildParameters(ep) {
        const parts = []
        if (ep.paramTypes) {
            for (const [name, type] of Object.entries(ep.paramTypes)) {
                parts.push(`${name}: ${type}`)
            }
        }
        if (ep.bodyType) {
            parts.push(`body: ${ep.bodyType}`)
        }
        if (ep.queryType) {
            parts.push(`params?: ${ep.queryType}`)
        }
        parts.push('nextOptions?: NextOptions')
        return parts.join(', ')
    }
    buildUrlLines(ep) {
        let path = ep.path
        if (ep.paramTypes) {
            for (const name of Object.keys(ep.paramTypes)) {
                path = path.split(`:${name}`).join(`\${${name}}`)
            }
        }
        if (ep.queryType) {
            return [
                'const query = this.buildQueryString(params)',
                `const url = \`\${this.config.baseURL}/api${path}\${query}\``,
            ]
        }
        return [`const url = \`\${this.config.baseURL}/api${path}\``]
    }
    buildRequestOptions(ep) {
        const opts = []
        if (ep.method !== 'GET') {
            opts.push(`method: '${ep.method}'`)
        }
        if (ep.bodyType) {
            // FormData passes through as-is so the browser sets multipart
            // boundary; everything else gets JSON-serialized.
            if (ep.bodyType === 'FormData') {
                opts.push('body')
            } else {
                opts.push('body: JSON.stringify(body)')
            }
        }
        if (opts.length === 0) return '{}'
        return `{ ${opts.join(', ')} }`
    }
    buildDocComment(ep) {
        const route = `${ep.method} /api${ep.path}`
        if (!ep.description) {
            return `  /** ${route} */`
        }
        return `  /**\n   * ${ep.description}\n   *\n   * ${route}\n   */`
    }
}
//# sourceMappingURL=plugin-api-generator.js.map
