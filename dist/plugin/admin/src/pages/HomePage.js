import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { useState, useEffect } from 'react'
import { PLUGIN_ID } from '../pluginId'
// @ts-expect-error – available at runtime inside Strapi admin
import { useFetchClient } from '@strapi/strapi/admin'
import {
    Main,
    Box,
    Typography,
    Flex,
    Badge,
    Loader,
    Tabs,
} from '@strapi/design-system'
const METHOD_COLORS = {
    GET: { bg: 'primary100', text: 'primary700' },
    POST: { bg: 'success100', text: 'success700' },
    PUT: { bg: 'warning100', text: 'warning700' },
    PATCH: { bg: 'warning100', text: 'warning700' },
    DELETE: { bg: 'danger100', text: 'danger700' },
}
export default function HomePage() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [expandedItems, setExpandedItems] = useState(new Set())
    const [expandedEndpoints, setExpandedEndpoints] = useState(new Set())
    const { get } = useFetchClient()
    useEffect(() => {
        get(`/${PLUGIN_ID}/schema`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])
    const toggleItem = uid => {
        setExpandedItems(prev => {
            const next = new Set(prev)
            if (next.has(uid)) {
                next.delete(uid)
            } else {
                next.add(uid)
            }
            return next
        })
    }
    const toggleEndpoint = key => {
        setExpandedEndpoints(prev => {
            const next = new Set(prev)
            if (next.has(key)) {
                next.delete(key)
            } else {
                next.add(key)
            }
            return next
        })
    }
    if (loading) {
        return _jsx(Main, {
            children: _jsx(Box, {
                padding: 8,
                children: _jsx(Flex, {
                    justifyContent: 'center',
                    children: _jsx(Loader, { children: 'Loading schema...' }),
                }),
            }),
        })
    }
    if (error || !data) {
        return _jsx(Main, {
            children: _jsx(Box, {
                padding: 8,
                children: _jsx(Typography, {
                    textColor: 'danger600',
                    children: error || 'No schema data available',
                }),
            }),
        })
    }
    // Filter out plugin types except User - Permission/Role not needed for frontend
    const contentTypes = Object.values(data.schema.contentTypes).filter(
        ct =>
            !ct.uid.startsWith('plugin::') ||
            ct.uid === 'plugin::users-permissions.user',
    )
    const components = Object.values(data.schema.components)
    const endpoints = data.endpoints || []
    return _jsx(Main, {
        children: _jsxs(Box, {
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 4,
            paddingRight: 4,
            background: 'neutral100',
            children: [
                _jsxs(Box, {
                    paddingBottom: 4,
                    children: [
                        _jsx(Typography, {
                            variant: 'alpha',
                            tag: 'h1',
                            children: 'Schema Types',
                        }),
                        _jsx(Box, {
                            paddingTop: 1,
                            children: _jsx(Typography, {
                                variant: 'epsilon',
                                textColor: 'neutral600',
                                children:
                                    'View your Strapi schema for TypeScript type generation',
                            }),
                        }),
                    ],
                }),
                _jsx(Box, {
                    padding: 4,
                    background: 'neutral0',
                    hasRadius: true,
                    shadow: 'filterShadow',
                    marginBottom: 6,
                    children: _jsxs(Flex, {
                        gap: 4,
                        wrap: 'wrap',
                        children: [
                            _jsxs(Box, {
                                style: { minWidth: 0, flex: '1 1 100%' },
                                children: [
                                    _jsx(Typography, {
                                        variant: 'sigma',
                                        textColor: 'neutral600',
                                        children: 'Schema Hash',
                                    }),
                                    _jsx(Box, {
                                        paddingTop: 1,
                                        children: _jsx(Typography, {
                                            variant: 'omega',
                                            style: {
                                                fontFamily: 'monospace',
                                                fontSize: '12px',
                                                wordBreak: 'break-all',
                                            },
                                            children: data.hash,
                                        }),
                                    }),
                                ],
                            }),
                            _jsxs(Box, {
                                style: { minWidth: 0 },
                                children: [
                                    _jsx(Typography, {
                                        variant: 'sigma',
                                        textColor: 'neutral600',
                                        children: 'Generated',
                                    }),
                                    _jsx(Box, {
                                        paddingTop: 1,
                                        children: _jsx(Typography, {
                                            variant: 'omega',
                                            children: new Date(
                                                data.generatedAt,
                                            ).toLocaleString(),
                                        }),
                                    }),
                                ],
                            }),
                            _jsxs(Box, {
                                children: [
                                    _jsx(Typography, {
                                        variant: 'sigma',
                                        textColor: 'neutral600',
                                        children: 'Content Types',
                                    }),
                                    _jsx(Box, {
                                        paddingTop: 1,
                                        children: _jsx(Typography, {
                                            variant: 'omega',
                                            fontWeight: 'bold',
                                            children: contentTypes.length,
                                        }),
                                    }),
                                ],
                            }),
                            _jsxs(Box, {
                                children: [
                                    _jsx(Typography, {
                                        variant: 'sigma',
                                        textColor: 'neutral600',
                                        children: 'Components',
                                    }),
                                    _jsx(Box, {
                                        paddingTop: 1,
                                        children: _jsx(Typography, {
                                            variant: 'omega',
                                            fontWeight: 'bold',
                                            children: components.length,
                                        }),
                                    }),
                                ],
                            }),
                            _jsxs(Box, {
                                children: [
                                    _jsx(Typography, {
                                        variant: 'sigma',
                                        textColor: 'neutral600',
                                        children: 'Endpoints',
                                    }),
                                    _jsx(Box, {
                                        paddingTop: 1,
                                        children: _jsx(Typography, {
                                            variant: 'omega',
                                            fontWeight: 'bold',
                                            children: endpoints.length,
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
                _jsxs(Tabs.Root, {
                    defaultValue: 'contentTypes',
                    children: [
                        _jsxs(Tabs.List, {
                            children: [
                                _jsxs(Tabs.Trigger, {
                                    value: 'contentTypes',
                                    children: [
                                        'Content Types (',
                                        contentTypes.length,
                                        ')',
                                    ],
                                }),
                                _jsxs(Tabs.Trigger, {
                                    value: 'components',
                                    children: [
                                        'Components (',
                                        components.length,
                                        ')',
                                    ],
                                }),
                                _jsxs(Tabs.Trigger, {
                                    value: 'endpoints',
                                    children: [
                                        'Endpoints (',
                                        endpoints.length,
                                        ')',
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(Box, {
                            paddingTop: 4,
                            children: [
                                _jsx(Tabs.Content, {
                                    value: 'contentTypes',
                                    children: _jsx(Box, {
                                        background: 'neutral100',
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                        },
                                        children: contentTypes.map(ct =>
                                            _jsx(
                                                SchemaItem,
                                                {
                                                    item: ct,
                                                    isExpanded:
                                                        expandedItems.has(
                                                            ct.uid,
                                                        ),
                                                    onToggle: () =>
                                                        toggleItem(ct.uid),
                                                },
                                                ct.uid,
                                            ),
                                        ),
                                    }),
                                }),
                                _jsx(Tabs.Content, {
                                    value: 'components',
                                    children: _jsx(Box, {
                                        background: 'neutral100',
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                        },
                                        children: components.map(comp =>
                                            _jsx(
                                                SchemaItem,
                                                {
                                                    item: comp,
                                                    isExpanded:
                                                        expandedItems.has(
                                                            comp.uid,
                                                        ),
                                                    onToggle: () =>
                                                        toggleItem(comp.uid),
                                                },
                                                comp.uid,
                                            ),
                                        ),
                                    }),
                                }),
                                _jsx(Tabs.Content, {
                                    value: 'endpoints',
                                    children: _jsx(Box, {
                                        background: 'neutral100',
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                        },
                                        children:
                                            endpoints.length === 0
                                                ? _jsx(Box, {
                                                      padding: 4,
                                                      background: 'neutral0',
                                                      hasRadius: true,
                                                      children: _jsx(
                                                          Typography,
                                                          {
                                                              textColor:
                                                                  'neutral600',
                                                              children:
                                                                  'No custom endpoints found. Add routes to your API to see them here.',
                                                          },
                                                      ),
                                                  })
                                                : endpoints.map(endpoint => {
                                                      const key = `${endpoint.method}-${endpoint.path}`
                                                      return _jsx(
                                                          EndpointItem,
                                                          {
                                                              endpoint:
                                                                  endpoint,
                                                              isExpanded:
                                                                  expandedEndpoints.has(
                                                                      key,
                                                                  ),
                                                              onToggle: () =>
                                                                  toggleEndpoint(
                                                                      key,
                                                                  ),
                                                          },
                                                          key,
                                                      )
                                                  }),
                                    }),
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
    })
}
function SchemaItem({ item, isExpanded, onToggle }) {
    const attributes = Object.entries(item.attributes || {})
    return _jsxs(Box, {
        background: 'neutral0',
        hasRadius: true,
        borderColor: 'neutral200',
        borderStyle: 'solid',
        borderWidth: '1px',
        overflow: 'hidden',
        children: [
            _jsx(Box, {
                padding: 4,
                background: isExpanded ? 'primary100' : 'neutral0',
                style: { cursor: 'pointer', transition: 'background 0.2s' },
                onClick: onToggle,
                children: _jsxs(Flex, {
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 2,
                    wrap: 'wrap',
                    children: [
                        _jsxs(Box, {
                            style: { minWidth: 0, flex: '1 1 0' },
                            children: [
                                _jsxs(Flex, {
                                    gap: 2,
                                    alignItems: 'center',
                                    wrap: 'wrap',
                                    children: [
                                        _jsx(Typography, {
                                            fontWeight: 'bold',
                                            textColor: 'neutral800',
                                            variant: 'delta',
                                            children:
                                                item.info?.displayName ||
                                                item.uid.split('.').pop(),
                                        }),
                                        _jsxs(Badge, {
                                            active: isExpanded,
                                            children: [
                                                attributes.length,
                                                ' fields',
                                            ],
                                        }),
                                    ],
                                }),
                                _jsx(Box, {
                                    paddingTop: 1,
                                    children: _jsx(Typography, {
                                        variant: 'pi',
                                        textColor: 'neutral500',
                                        style: {
                                            fontFamily: 'monospace',
                                            fontSize: '11px',
                                            wordBreak: 'break-all',
                                        },
                                        children: item.uid,
                                    }),
                                }),
                            ],
                        }),
                        _jsx(Typography, {
                            textColor: 'neutral500',
                            style: { flexShrink: 0 },
                            children: isExpanded ? '▼' : '▶',
                        }),
                    ],
                }),
            }),
            isExpanded &&
                _jsxs(Box, {
                    background: 'neutral0',
                    borderColor: 'neutral200',
                    borderStyle: 'solid',
                    borderWidth: '1px 0 0 0',
                    children: [
                        _jsxs(Box, {
                            background: 'neutral100',
                            borderColor: 'neutral200',
                            borderStyle: 'solid',
                            borderWidth: '0 0 1px 0',
                            paddingTop: 3,
                            paddingBottom: 3,
                            paddingLeft: 4,
                            paddingRight: 4,
                            style: {
                                display: 'grid',
                                gridTemplateColumns: GRID_COLUMNS,
                                gap: '0 24px',
                            },
                            children: [
                                _jsx(Typography, {
                                    variant: 'sigma',
                                    textColor: 'neutral600',
                                    children: 'Field',
                                }),
                                _jsx(Typography, {
                                    variant: 'sigma',
                                    textColor: 'neutral600',
                                    children: 'Type',
                                }),
                                _jsx(Typography, {
                                    variant: 'sigma',
                                    textColor: 'neutral600',
                                    children: 'Details',
                                }),
                            ],
                        }),
                        attributes.map(([name, attr], i) =>
                            _jsxs(
                                Box,
                                {
                                    borderColor: 'neutral150',
                                    borderStyle: 'solid',
                                    borderWidth: i > 0 ? '1px 0 0 0' : '0',
                                    paddingTop: 3,
                                    paddingBottom: 3,
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: GRID_COLUMNS,
                                        gap: '0 24px',
                                        alignItems: 'center',
                                    },
                                    children: [
                                        _jsxs(Typography, {
                                            textColor: 'neutral800',
                                            fontWeight: 'bold',
                                            style: { wordBreak: 'break-word' },
                                            children: [
                                                name,
                                                attr.required &&
                                                    _jsxs(Typography, {
                                                        textColor: 'danger600',
                                                        children: [' ', '*'],
                                                    }),
                                            ],
                                        }),
                                        _jsx(Badge, { children: attr.type }),
                                        _jsx(Typography, {
                                            variant: 'omega',
                                            textColor: 'neutral600',
                                            style: { wordBreak: 'break-word' },
                                            children: getDetails(attr),
                                        }),
                                    ],
                                },
                                name,
                            ),
                        ),
                    ],
                }),
        ],
    })
}
function parseObjectType(typeStr) {
    const fields = []
    // Remove outer braces and trim
    let inner = typeStr.trim()
    if (inner.startsWith('{')) {
        inner = inner.slice(1)
    }
    if (inner.endsWith('}')) {
        inner = inner.slice(0, -1)
    }
    inner = inner.trim()
    if (!inner) return fields
    // Split by semicolons or newlines, handling nested braces
    const parts = []
    let current = ''
    let depth = 0
    for (const char of inner) {
        if (char === '{') depth++
        else if (char === '}') depth--
        if ((char === ';' || char === '\n') && depth === 0) {
            if (current.trim()) {
                parts.push(current.trim())
            }
            current = ''
        } else {
            current += char
        }
    }
    if (current.trim()) {
        parts.push(current.trim())
    }
    for (const part of parts) {
        // Match: fieldName?: type or fieldName: type
        const match = part.match(/^(\w+)(\?)?:\s*(.+)$/)
        if (match) {
            const [, name, optional, type] = match
            const typeValue = type.trim()
            // Determine the type badge
            let typeBadge
            let details = ''
            if (typeValue === 'number') {
                typeBadge = 'number'
            } else if (typeValue === 'boolean') {
                typeBadge = 'boolean'
            } else if (typeValue === 'string') {
                typeBadge = 'string'
            } else if (typeValue.startsWith('{')) {
                typeBadge = 'object'
                details = typeValue
            } else if (
                typeValue.startsWith('Array<') ||
                typeValue.startsWith('[') ||
                typeValue.endsWith('[]')
            ) {
                typeBadge = 'array'
                // Extract inner type for Array<...>
                if (typeValue.startsWith('Array<')) {
                    details = typeValue.slice(6, -1) // Remove "Array<" and ">"
                } else {
                    details = typeValue
                }
            } else if (typeValue.includes('|')) {
                typeBadge = 'enumeration'
                details = typeValue
            } else {
                typeBadge = typeValue.toLowerCase()
                if (!['number', 'string', 'boolean'].includes(typeBadge)) {
                    typeBadge = 'object'
                    details = typeValue
                }
            }
            fields.push({
                name,
                type: typeBadge,
                required: !optional,
                details,
            })
        }
    }
    return fields
}
function EndpointItem({ endpoint, isExpanded, onToggle }) {
    const methodColor = METHOD_COLORS[endpoint.method] || {
        bg: 'neutral100',
        text: 'neutral700',
    }
    const hasTypes =
        endpoint.types &&
        (endpoint.types.body ||
            endpoint.types.response ||
            endpoint.types.params ||
            endpoint.types.query)
    // Parse body and response into fields
    const bodyFields =
        endpoint.types?.body && endpoint.types.body !== 'void'
            ? parseObjectType(endpoint.types.body)
            : []
    // Unwrap response.data automatically if present
    let responseFields = []
    if (endpoint.types?.response) {
        const parsed = parseObjectType(endpoint.types.response)
        // If response has only one field called 'data', unwrap it
        if (
            parsed.length === 1 &&
            parsed[0].name === 'data' &&
            parsed[0].details
        ) {
            responseFields = parseObjectType(parsed[0].details)
        } else {
            responseFields = parsed
        }
    }
    const totalFields = bodyFields.length + responseFields.length
    return _jsxs(Box, {
        background: 'neutral0',
        hasRadius: true,
        borderColor: 'neutral200',
        borderStyle: 'solid',
        borderWidth: '1px',
        overflow: 'hidden',
        children: [
            _jsx(Box, {
                padding: 4,
                background: isExpanded ? 'primary100' : 'neutral0',
                style: { cursor: 'pointer', transition: 'background 0.2s' },
                onClick: onToggle,
                children: _jsxs(Flex, {
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 2,
                    children: [
                        _jsxs(Box, {
                            style: { minWidth: 0, flex: '1 1 0' },
                            children: [
                                _jsxs(Flex, {
                                    gap: 2,
                                    alignItems: 'center',
                                    wrap: 'wrap',
                                    children: [
                                        _jsx(Box, {
                                            padding: 1,
                                            paddingLeft: 2,
                                            paddingRight: 2,
                                            background: methodColor.bg,
                                            hasRadius: true,
                                            style: { flexShrink: 0 },
                                            children: _jsx(Typography, {
                                                fontWeight: 'bold',
                                                textColor: methodColor.text,
                                                style: {
                                                    fontFamily: 'monospace',
                                                    fontSize: '12px',
                                                },
                                                children: endpoint.method,
                                            }),
                                        }),
                                        _jsx(Typography, {
                                            fontWeight: 'bold',
                                            textColor: 'neutral800',
                                            style: {
                                                fontFamily: 'monospace',
                                                wordBreak: 'break-all',
                                            },
                                            children: endpoint.path,
                                        }),
                                        hasTypes &&
                                            _jsxs(Badge, {
                                                active: true,
                                                children: [
                                                    totalFields,
                                                    ' fields',
                                                ],
                                            }),
                                    ],
                                }),
                                _jsx(Box, {
                                    paddingTop: 1,
                                    children: _jsx(Typography, {
                                        variant: 'pi',
                                        textColor: 'neutral500',
                                        style: {
                                            fontFamily: 'monospace',
                                            fontSize: '11px',
                                            wordBreak: 'break-all',
                                        },
                                        children: endpoint.handler,
                                    }),
                                }),
                            ],
                        }),
                        _jsx(Typography, {
                            textColor: 'neutral500',
                            style: { flexShrink: 0 },
                            children: isExpanded ? '▼' : '▶',
                        }),
                    ],
                }),
            }),
            isExpanded &&
                _jsx(Box, {
                    padding: 4,
                    background: 'neutral100',
                    borderColor: 'neutral200',
                    borderStyle: 'solid',
                    borderWidth: '1px 0 0 0',
                    children: hasTypes
                        ? _jsxs(Box, {
                              style: {
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '16px',
                              },
                              children: [
                                  bodyFields.length > 0 &&
                                      _jsxs(Box, {
                                          children: [
                                              _jsx(Box, {
                                                  paddingBottom: 2,
                                                  children: _jsx(Typography, {
                                                      variant: 'sigma',
                                                      textColor: 'neutral600',
                                                      children: 'Request Body',
                                                  }),
                                              }),
                                              _jsx(FieldsList, {
                                                  fields: bodyFields,
                                                  showRequired: true,
                                              }),
                                          ],
                                      }),
                                  responseFields.length > 0 &&
                                      _jsxs(Box, {
                                          children: [
                                              _jsx(Box, {
                                                  paddingBottom: 2,
                                                  children: _jsx(Typography, {
                                                      variant: 'sigma',
                                                      textColor: 'neutral600',
                                                      children: 'Response',
                                                  }),
                                              }),
                                              _jsx(FieldsList, {
                                                  fields: responseFields,
                                              }),
                                          ],
                                      }),
                              ],
                          })
                        : _jsxs(Typography, {
                              variant: 'pi',
                              textColor: 'neutral500',
                              children: [
                                  'No type definitions found. Add an',
                                  ' ',
                                  _jsx(Typography, {
                                      style: { fontFamily: 'monospace' },
                                      textColor: 'neutral600',
                                      children: 'export interface Endpoints',
                                  }),
                                  ' ',
                                  'to the controller to enable type generation.',
                              ],
                          }),
                }),
        ],
    })
}
const GRID_COLUMNS = 'minmax(120px, 280px) 130px 1fr'
function FieldsList({ fields, showRequired }) {
    return _jsxs(Box, {
        background: 'neutral0',
        hasRadius: true,
        borderColor: 'neutral200',
        borderStyle: 'solid',
        borderWidth: '1px',
        overflow: 'hidden',
        children: [
            _jsxs(Box, {
                background: 'neutral100',
                borderColor: 'neutral200',
                borderStyle: 'solid',
                borderWidth: '0 0 1px 0',
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 4,
                paddingRight: 4,
                style: {
                    display: 'grid',
                    gridTemplateColumns: GRID_COLUMNS,
                    gap: '0 24px',
                },
                children: [
                    _jsx(Typography, {
                        variant: 'sigma',
                        textColor: 'neutral600',
                        children: 'Field',
                    }),
                    _jsx(Typography, {
                        variant: 'sigma',
                        textColor: 'neutral600',
                        children: 'Type',
                    }),
                    _jsx(Typography, {
                        variant: 'sigma',
                        textColor: 'neutral600',
                        children: 'Details',
                    }),
                ],
            }),
            fields.map((field, i) =>
                _jsxs(
                    Box,
                    {
                        borderColor: 'neutral150',
                        borderStyle: 'solid',
                        borderWidth: i > 0 ? '1px 0 0 0' : '0',
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingLeft: 4,
                        paddingRight: 4,
                        style: {
                            display: 'grid',
                            gridTemplateColumns: GRID_COLUMNS,
                            gap: '0 24px',
                            alignItems: 'center',
                        },
                        children: [
                            _jsxs(Typography, {
                                textColor: 'neutral800',
                                fontWeight: 'bold',
                                style: { wordBreak: 'break-word' },
                                children: [
                                    field.name,
                                    showRequired &&
                                        field.required &&
                                        _jsx(Typography, {
                                            textColor: 'danger600',
                                            children: ' *',
                                        }),
                                ],
                            }),
                            _jsx(Badge, { children: field.type }),
                            _jsx(Typography, {
                                variant: 'omega',
                                textColor: 'neutral600',
                                style: { wordBreak: 'break-word' },
                                children: field.details || '',
                            }),
                        ],
                    },
                    field.name,
                ),
            ),
        ],
    })
}
function getDetails(attr) {
    const details = []
    if (attr.relation) {
        details.push(`${attr.relation} → ${attr.target}`)
    }
    if (attr.component) {
        details.push(attr.component)
        if (attr.repeatable) details.push('(repeatable)')
    }
    if (attr.components) {
        details.push(attr.components.join(', '))
    }
    if (attr.enum) {
        details.push(attr.enum.join(' | '))
    }
    if (attr.multiple) {
        details.push('multiple')
    }
    return details.join(' ')
}
//# sourceMappingURL=HomePage.js.map
