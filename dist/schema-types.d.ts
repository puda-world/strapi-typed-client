export interface ParsedSchema {
    contentTypes: ContentType[]
    components: Component[]
}
export interface ContentType {
    name: string
    cleanName: string
    collectionName: string
    singularName: string
    pluralName: string
    kind: 'collection' | 'single'
    pluginName?: string
    attributes: Attribute[]
    relations: Relation[]
    media: MediaField[]
    components: ComponentField[]
    dynamicZones: DynamicZoneField[]
}
export interface Component {
    name: string
    cleanName: string
    category: string
    uid: string
    attributes: Attribute[]
    relations: Relation[]
    media: MediaField[]
    components: ComponentField[]
    dynamicZones: DynamicZoneField[]
}
export interface Relation {
    name: string
    relationType: 'oneToOne' | 'oneToMany' | 'manyToOne' | 'manyToMany'
    target: string
    targetType: string
    required: boolean
}
export interface MediaField {
    name: string
    multiple: boolean
    required: boolean
}
export interface ComponentField {
    name: string
    component: string
    componentType: string
    repeatable: boolean
    required: boolean
}
export interface DynamicZoneField {
    name: string
    components: string[]
    componentTypes: string[]
    required: boolean
}
export interface Attribute {
    name: string
    type: AttributeType
    required: boolean
    unique?: boolean
    defaultValue?: unknown
    constraints?: AttributeConstraints
}
export interface AttributeConstraints {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    regex?: string
}
export type AttributeType =
    | {
          kind: 'string'
      }
    | {
          kind: 'text'
      }
    | {
          kind: 'richtext'
      }
    | {
          kind: 'blocks'
      }
    | {
          kind: 'email'
      }
    | {
          kind: 'integer'
      }
    | {
          kind: 'biginteger'
      }
    | {
          kind: 'float'
      }
    | {
          kind: 'decimal'
      }
    | {
          kind: 'boolean'
      }
    | {
          kind: 'date'
      }
    | {
          kind: 'datetime'
      }
    | {
          kind: 'time'
      }
    | {
          kind: 'json'
      }
    | {
          kind: 'enumeration'
          values: string[]
      }
    | {
          kind: 'media'
          multiple?: boolean
      }
    | {
          kind: 'component'
          component: string
          repeatable?: boolean
      }
    | {
          kind: 'dynamiczone'
          components: string[]
      }
    | {
          kind: 'relation'
          relationType: 'oneToOne' | 'oneToMany' | 'manyToOne' | 'manyToMany'
          target: string
      }
//# sourceMappingURL=schema-types.d.ts.map
