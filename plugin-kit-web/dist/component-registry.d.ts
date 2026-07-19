/**
 * Canonical tag → loader module path mapping for the autoloader.
 * Module paths are relative to the directory that contains plugin-kit.loader.js.
 */
export declare const COMPONENT_MODULE_PATHS: Record<string, string>;
/**
 * Canonical list of every `pk-*` custom element tag.
 * Single source of truth for FOUCE CSS generation and any tag enumeration.
 */
export declare const PK_COMPONENT_TAGS: readonly string[];
/** Vite loader-build entries: output key → source module. */
export declare const LOADER_COMPONENT_ENTRIES: Record<string, string>;
/**
 * Vite `dist/` build entries for bundler cherry-picking.
 * Output paths mirror source layout, e.g. `dist/components/button/pk-button.js`.
 */
export declare const BUNDLER_COMPONENT_ENTRIES: Record<string, string>;
/** Tag → bundler dist subpath (relative to package root, no `./` prefix). */
export declare const BUNDLER_TAG_IMPORT_PATHS: Record<string, string>;
export type PkComponentTag = keyof typeof BUNDLER_TAG_IMPORT_PATHS;
/**
 * Short consumer entries published as `@verbb/plugin-kit-web/components/{key}.js`.
 * Each module side-effect-registers its family (compound folders register every tag).
 *
 * TipTap stays split — importing one surface must not pull the other two.
 */
export declare const COMPONENT_FAMILY_ENTRIES: Record<string, string>;
//# sourceMappingURL=component-registry.d.ts.map