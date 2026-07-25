/**
 * Read a constant baked into the generated client header — SCHEMA_HASH and
 * GENERATOR_VERSION are emitted as the first exports of client.ts/client.js, so
 * reading the file head is enough and avoids parsing the whole client.
 *
 * Node-only (uses `fs`). Shared by the CLI file-writer and the Next.js plugin
 * so the two readers can't drift. Do NOT re-export from the shared barrel —
 * keep `fs` out of any browser bundle (same rule as `shared/version`).
 *
 * @module shared/client-header
 */
/**
 * Read a `export const <NAME> = '<value>'` baked into the generated client
 * header. Tries client.ts (raw, .ts mode) first, then client.js (compiled, .js
 * mode). Returns null when not generated or the constant is absent (e.g. a
 * client produced before that constant was stamped).
 */
export declare function readClientHeaderConst(
    outputDir: string,
    name: string,
): string | null
//# sourceMappingURL=client-header.d.ts.map
