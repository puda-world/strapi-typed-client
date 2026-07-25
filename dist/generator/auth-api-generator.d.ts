import { ParsedRoute } from '../shared/route-types.js'
import type { AuthMode } from '../shared/strapi-schema-types.js'
export declare class AuthApiGenerator {
    generateAuthTypes(authMode?: AuthMode): string
    generateAuthApiClass(
        authRoutes?: ParsedRoute[],
        userRoutes?: ParsedRoute[],
        authMode?: AuthMode,
    ): string
    private buildAuthApiClass
    /**
     * The method name a route will be emitted under — mirrors the renames in
     * generateAuthMethod (login, confirmEmail). Used to detect collisions with
     * the injected client-side helpers.
     */
    private methodNameFor
    private generateAuthMethod
    private getReturnType
    private generateMeMethod
    private generateUpdateMeMethod
    private generateCallbackMethod
    private generateConfirmEmailMethod
    private generateSendEmailConfirmationMethod
    private generateClientSideHelpers
    private generateAuthMethodParams
    private generateAuthPathExpression
}
//# sourceMappingURL=auth-api-generator.d.ts.map
