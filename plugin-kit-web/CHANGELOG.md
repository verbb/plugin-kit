# Changelog

## Unreleased

### Added
- `pk-calendar` and `pk-date-picker` gain a third `mode`, `multiple`, alongside `single` / `range`. Multi-date selection serializes as a comma-separated, deduped, ascending-sorted ISO list (e.g. `2026-01-03,2026-01-05`) for both the `value` property and the submitted form value; clicking a day toggles it and the panel stays open, with a `"N dates selected"` count summary. New `parseDateList` / `formatDateList` / `toggleDateInList` helpers in `utils/date`.
- `pk-color-input` gains a `readonly` boolean (matching `pk-input`): the hex field is read-only, the native swatch picker is disabled, and input handlers no-op.

## 2.0.4 - 2026-07-21

### Fixed
- Slotted light-DOM labels on dropdown items (and related slotty hosts) no longer inherit Craft CP / page line-height via `font: inherit`. `:host` pins size-token `font-size` / `line-height` / `color` so the same `size` looks identical under tight Craft metrics and comfortable Tailwind metrics. Also covers `pk-dropdown-label`, `pk-option`, `pk-tab`, and `pk-button` slotted labels.

### Added
- Workshop dual-host stress lab at `/tools/slotted-host` (Craft-like vs Tailwind-like page metrics, ellipsis + text-trigger menus, ancestor `line-height: normal` noise case, overlay mode, item-height measure).

## 2.0.4 - 2026-07-19

### Fixed
- Light-dismiss hit testing no longer treats *any* `pk-popup` in the composed path as inside the open overlay. Sibling dropdown triggers (which slot inside their own `pk-popup`) now correctly dismiss open popovers/selects/comboboxes/date pickers instead of leaving two overlays open.

## 2.0.3 - 2026-07-19

### Changed
- Restored lockstep versioning across all `@verbb/plugin-kit-*` packages after interim `2.0.1` / `2.0.2` drift.

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
