# Changelog

## Unreleased

### Fixed
- `<pk-icon>` re-resolves when the shared icon registry gains glyphs (pairs with `@verbb/plugin-kit-icons` page-global registry — later plugins’ `registerIcons` fill icons that upgraded earlier).

## 2.0.12 - 2026-08-25

### Changed
- Released alongside the other `@verbb/plugin-kit-*` packages to keep versions aligned.

## 2.0.11 - 2026-08-25

### Fixed
- `@customElement` registration is idempotent (`customElements.get` guard). Multiple Craft plugins that each bundle Plugin Kit no longer throw `NotSupportedError: "pk-spinner" has already been used` (and abort the rest of that register bundle) when several fields share a CP page.
- `<pk-dialog>` pointer light-dismiss no longer closes the dialog when a nested dismissible overlay (e.g. `pk-dropdown-menu` / `pk-select`) is open — click-off closes the menu only.

## 2.0.10 - 2026-08-23

### Added
- `<pk-connect-oauth>` — OAuth connect row (Craft `.formsubmit` Connect/Disconnect + dirty-form save warning).
- React `<ConnectOauth>` facade over `<pk-connect-oauth>`.

### Added
- `<pk-connect>` — credentials / REST connect row for Craft CP source settings (light DOM; Video Picker behavior without jQuery).
- Document styles: `@verbb/plugin-kit-web/styles/connect/pk-connect.css` (`.pk-connect-field` layout + error dialog).
- React `<Connect>` facade over `<pk-connect>`.

## 2.0.9 - 2026-08-21

### Changed
- `pk-icon` SVGs set `overflow: visible` so FA-style canvas overhang is not clipped (pairs with `@verbb/plugin-kit-icons` square viewBox normalization).
- `<pk-editable-table>` reorder handle uses kit `gripMove` / Craft diamond (was a hardcoded copy of the same path under a `START_GRIP_ICON` name — not FA `grip`).

## 2.0.8 - 2026-08-20

### Fixed
- Documented that controlled `pk-dialog` zero-footprint hosts still participate in DOM sibling selectors (e.g. Tailwind `space-y-*` / `:not(:last-child)`). Prefer flex/grid `gap-*` or mount overlays outside the spaced stack; a light-DOM portal would also address it.
- No longer sets permanent `html { scrollbar-gutter: stable }` (tokens + ShadowRoot config injector). That reserved an empty scrollbar strip on every Craft CP page (Formie, Navigation, etc.).
- Overlay scroll lock now follows Craft / Garnish.Modal’s document model: `body { overflow: hidden }` only (Craft’s `body.no-scroll`), plus wheel/touch/page-key `preventDefault` outside locking hosts so the page cannot scroll under the shade. Does **not** use `body { position: fixed }`, `overflow: hidden` on `html`, lock-time `scrollbar-gutter`, `padding-right`, or scroll-position pin listeners (sticky `#global-sidebar` jumps, width shifts, or rubber-band scrollbar). Dialog hosts stay `position: fixed` like Craft’s modal/shade.

### Added
- `pk-dialog` / React `Dialog` gain `disableScrollLock` (`disable-scroll-lock`) to skip document scroll lock while open.

## 2.0.7 - 2026-08-07

### Changed
- Released alongside the other `@verbb/plugin-kit-*` packages to keep versions aligned.

## 2.0.6 - 2026-07-21

### Changed
- Released alongside the other `@verbb/plugin-kit-*` packages to keep versions aligned.

## 2.0.5 - 2026-07-21

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
