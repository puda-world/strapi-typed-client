export function stringifyQuery(obj) {
    const pairs = []
    for (const key of Object.keys(obj)) {
        appendEntry(obj[key], key, pairs)
    }
    return pairs.join('&')
}
export function appendEntry(value, prefix, pairs) {
    if (value === null || value === undefined) return
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            appendEntry(value[i], `${prefix}[${i}]`, pairs)
        }
        return
    }
    if (value instanceof Date) {
        pairs.push(`${prefix}=${encodeURIComponent(value.toISOString())}`)
        return
    }
    if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
            appendEntry(value[key], `${prefix}[${key}]`, pairs)
        }
        return
    }
    pairs.push(`${prefix}=${encodeURIComponent(String(value))}`)
}
//# sourceMappingURL=stringify-query.js.map
