/**
 * Tiny helper for building a local async registrar from an explicit loader map.
 * Prefer short family side-effect imports for Craft CP bundles:
 * `import '@verbb/plugin-kit-web/components/button.js'`.
 */
export declare function createRegisterComponents<T extends string>(loaders: Record<T, () => Promise<unknown>>): (tags: readonly T[]) => Promise<void>;
//# sourceMappingURL=create-register-components.d.ts.map