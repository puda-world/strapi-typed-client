/**
 * Hand-rolled interactive prompts (zero-dep): styled text questions via
 * readline and an arrow-key select for enumerable choices
 */
export interface SelectChoice<T extends string> {
    value: T
    label: string
    hint?: string
}
export interface Prompter {
    text(label: string, defaultValue: string): Promise<string>
    select<T extends string>(
        label: string,
        choices: Array<SelectChoice<T>>,
        defaultValue: T,
    ): Promise<T>
}
export declare const bold: (s: string) => string
export declare const dim: (s: string) => string
export declare const cyan: (s: string) => string
export declare const green: (s: string) => string
export declare const yellow: (s: string) => string
export declare function createTerminalPrompter(): Prompter
//# sourceMappingURL=prompt.d.ts.map
