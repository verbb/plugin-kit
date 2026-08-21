# Changelog

## Unreleased

## 2.0.9 - 2026-08-21

### Added
- `sliders`, `lock`, `circle-info`, `circle-check`, `circle-exclamation` (shared across Formie / Navigation / Timber / Video Picker — drop plugin-local registrations once this ships).
- `arrows-rotate` icon (dual-arrow reload; preferred for refresh controls over `arrow-rotate-*`).
- `grip-move` icon (Craft CP `move` / diamond reorder handle — distinct from `grip-dots`).
- `grip-dots` / `grip-dots-vertical` icons (2×3 circle grids).
- Icon docs: `arrows-rotate` in Common Icons; Gallery is the canonical built-in list (click-to-copy).

### Changed
- Renamed `move-grip` → `grip-move` (JS `moveGrip` → `gripMove`).
- `iconViewBox()` / `iconToSvg()` normalize every glyph to a **centered square** viewBox (`max(width, height)` with equal padding) so edge-cropped paths fill `<pk-icon>`’s square `1em` host evenly. Rendered SVGs set `overflow="visible"` for intentional canvas overhang.
- `heading` and `paragraph` re-sourced (`448×512`) so every curated glyph uses the same edge-cropped canvas family (no more Heroicons `20×20` / ad-hoc `640×640` outliers).
- Icon names use canonical kebab names (no kit-local synonyms): `search` → `magnifying-glass`, `plus-circle` → `circle-plus`.

### Removed
- `grip` and `grip-vertical` (2×3 square grids) — use `grip-dots` / `grip-dots-vertical` instead.
- Heroicons `refresh` (`20×20`) — use `arrows-rotate` instead.
- `add` (duplicate of `plus`).
- `table-regular` (invented name / unused; use `table`).

## 2.0.8 - 2026-08-20

### Changed
- Released alongside the other `@verbb/plugin-kit-*` packages to keep versions aligned.

## 2.0.7 - 2026-08-07

### Changed
- Released alongside the other `@verbb/plugin-kit-*` packages to keep versions aligned.

## 2.0.6 - 2026-07-21

### Changed
- Released alongside the other `@verbb/plugin-kit-*` packages to keep versions aligned.

## 2.0.5 - 2026-07-21

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 2.0.4 - 2026-07-21

### Changed
- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.

## 2.0.3 - 2026-07-19

### Changed
- Restored lockstep versioning across all `@verbb/plugin-kit-*` packages after interim `2.0.1` / `2.0.2` drift.

## 2.0.0 - 2026-07-19

### Added
- Opt-in curated icon set for `<pk-icon>` via `registerIcons` (named exports) or `@verbb/plugin-kit-icons/all.js` for the full set.
- No synonym aliases — one canonical kebab-case name per glyph; camelCase JS keys normalize on register.

### Changed
- Package versions lockstep with `@verbb/plugin-kit-web` and related `@verbb/plugin-kit-*` packages at `2.0.0`.
- Bundler consumers no longer auto-register the full icon set on import (tree-shake friendly for Craft CP bundles).
