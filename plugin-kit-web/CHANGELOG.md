# Changelog

## Unreleased

## 2.0.0 - 2026-07-19

### Added
- Initial public release of `@verbb/plugin-kit-web` — canonical `<pk-*>` Craft CP components (Lit + shadow DOM, `--pk-*` tokens).
- Family side-effect registration entries (`@verbb/plugin-kit-web/components/{family}.js`) and default `plugin-kit.css` (tokens + FOUCE).
- Opt-in icon registry integration with `@verbb/plugin-kit-icons` (`registerIcons` / `all.js`).
- `<pk-editable-table>` as the canonical editable table (table-native pointer reorder, Craft-style cell controls).
- TipTap (`pk-tiptap-*`) and CodeMirror (`pk-code-editor`) surfaces backed by `@verbb/plugin-kit-tiptap-core` / `@verbb/plugin-kit-codemirror-core`.
- No-build loader path (`plugin-kit.loader.js`) for script-tag CP embeds.

### Changed
- Package versions lockstep with `@verbb/plugin-kit-react`, `@verbb/plugin-kit-vue`, `@verbb/plugin-kit-forms`, and related `@verbb/plugin-kit-*` packages at `2.0.0`.
