# Changelog

## Unreleased

## 2.0.0 - 2026-07-19

### Added
- Opt-in curated icon set for `<pk-icon>` via `registerIcons` (named exports) or `@verbb/plugin-kit-icons/all.js` for the full set.
- No synonym aliases — one canonical kebab-case name per glyph; camelCase JS keys normalize on register.

### Changed
- Package versions lockstep with `@verbb/plugin-kit-web` and related `@verbb/plugin-kit-*` packages at `2.0.0`.
- Bundler consumers no longer auto-register the full icon set on import (tree-shake friendly for Craft CP bundles).
