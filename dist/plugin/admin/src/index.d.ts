declare const _default: {
    register(app: any): void
    bootstrap(): void
    registerTrads({ locales }: { locales: string[] }): Promise<
        {
            data: {
                'strapi-typed-client.plugin.name': string
                'strapi-typed-client.page.title': string
                'strapi-typed-client.page.description': string
            }
            locale: string
        }[]
    >
}
export default _default
//# sourceMappingURL=index.d.ts.map
