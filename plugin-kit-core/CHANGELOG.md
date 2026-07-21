# Changelog

## Unreleased

### Fixed
- Importing string/handle utils (or anything else) from the package root no longer bundles `markdown-it` (~45 kB gzip) into a consumer. `markdown-it` is now constructed lazily and the package is published as `sideEffects: false`, so it only enters a bundle when `renderMarkdown` / `renderInlineMarkdown` (or `@verbb/plugin-kit-core/utils/markdown`) is actually used.

### Added
- Granular subpath exports so consumers can cherry-pick exactly what they need: `./utils`, `./utils/string`, `./utils/handle`, `./utils/markdown`, and `./host`. The build now preserves the `src` module structure (`dist/utils/string.js`, `dist/host/index.js`, …) instead of one concatenated bundle.

### Changed
- The package main entry is now `dist/index.js` (was `dist/plugin-kit-core.es.js`). Consumers importing from `@verbb/plugin-kit-core` via the `exports` map are unaffected; anything deep-linking the old bundle filename must switch to the package root or a subpath export.

### Removed
- **Breaking:** removed the eager `export { md }` markdown-it instance (an exported pre-built instance is itself a module-level side effect that defeats tree-shaking). Use the new `getMarkdownIt()` accessor for direct markdown-it API access.

## 2.0.4 - 2026-07-21

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 2.0.3 - 2026-07-19

### Changed
- Restored lockstep versioning across all `@verbb/plugin-kit-*` packages after interim `2.0.1` / `2.0.2` drift.

## 2.0.0 - 2026-07-19

### Changed
- Aligned package version with the Plugin Kit v2 lockstep release (`@verbb/plugin-kit-web`, React/Vue adapters, forms, and related packages).
- Continues to ship Craft host bridge helpers, shared utils, and ESLint presets for CP frontends.

## 1.0.9 - 2026-07-02

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 1.0.8 - 2026-06-23

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 1.0.7 - 2026-06-18

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 1.0.6 - 2026-06-14

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 1.0.5 - 2026-06-12

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 1.0.4 - 2026-06-10

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 1.0.1 - 2026-06-07

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 1.0.0

- Initial public release.
