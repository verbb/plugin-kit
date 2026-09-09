# Changelog

## Unreleased

### Added
- `<pk-autocomplete>` — freeform text field with optional `pk-option` suggestions
  (React/Vue `Autocomplete`). Committed `value` is the input text
  (`aria-autocomplete="both"`); Combobox stays selection-first. Shares option
  filter + async fetch helpers with Combobox. No filesystem scanning — plugins
  feed suggestions and Field `warning` / `invalid` for missing paths.
- Shared `waitForPopupContentExitAnimation` and `syncFilteredOptions` used by
  Combobox and Autocomplete (panel exit motion + filter visibility / group empty
  markers) — not a shared listbox controller.

### Changed
- `<pk-autocomplete>` field chrome matches `pk-input` (border / fill / focus ring;
  optional clear only). No longer reuses Combobox’s slate select fill or expand
  chevron — freeform text with suggestions, not a dropdown.
- `<pk-autocomplete>` async mode clears previous suggestion nodes when a search
  starts (and on open/close), so “Searching…” no longer appears under a stale list
  on reopen.
- Async Autocomplete / Combobox no longer stack `emptyMessage` under the async
  “No matches…” status — empty async UI goes through `async-status` only.
- Custom Elements Manifest (`custom-elements.json`) via `npm run gen:cem`. Web docs
  API tables (Slots / Attributes & Properties / Methods / Events / CSS Custom
  Properties / Custom States / CSS Parts / Dependencies) are generated for all
  documented `<pk-*>` components from Lit source. React and Vue component docs
  (including Input Group) get the same tables with framework prop/event naming.
- `<pk-image-browser>` — presentational static icon/image browser (trigger + search +
  grouped grid). Consumers supply `items` / `groups` with `value` / `label` /
  `preview` (URL or inline SVG); the kit does not scan disks or filter extensions.
  Modes: `icon` (compact glyphs) and `image` (larger photo tiles). Cell name
  visibility via `label-mode` / `labelMode`: `tooltip` (default), `inline`, or `none`. Form-associated
  with clear, scroll paging, and `pk-popup`
  panel. Host-driven `loading` shows a centered `pk-spinner` in the open panel
  (no loading copy); pair with `selected-label` / `selected-preview` for the
  closed trigger before the catalog is ready. Keyboard: open from trigger (Enter / Space / arrows); search combobox with
  `aria-activedescendant`; 2D arrow navigation in the grid; Enter selects; Escape
  closes; live-region announces filter results.

### Changed
- `<pk-image-browser>` renames `density` → `mode` (`icon` | `image`) — preview kind,
  not packing density. Type: `PkImageBrowserMode`.
- `<pk-image-browser>` icon mode uses ~22px glyphs in ~36px square cells (same
  glyph size for every `label-mode`) so select/hover rings clear the tips;
  content-height cells when labels are inline. Image mode defaults to the same tooltip treatment
  with larger photo tracks (~7.5rem), tight inset chrome, and `object-fit: cover`
  so previews fill the cell (cropping is fine for thumbnails). Image-mode
  select/hover ring is drawn above the photo (flush tiles otherwise hide inset
  `box-shadow`). Re-clicking the
  active option clears it when `with-clear` is on; hover highlight snaps back to
  the selected cell when the pointer leaves the grid.
- Accessible names no longer use HTML `title` / SVG `<title>` (no native hover
  tooltips). Icon-only controls use `aria-label` (or `sr-only` text). `<pk-button
  title>` maps to `aria-label` on the inner control. Copy button, field
  “Translatable”, image-browser options, editable-table row/drag/cell chrome, and
  TipTap variable-tag / link-bubble follow the same rule. Pair with
  `@verbb/plugin-kit-icons` `iconToSvg({ title })` → SVG `aria-label`.
- `<pk-copy-button slot="end">` inside `<pk-input>` is the canonical in-control copy
  pattern (same flex-reserved trailing action model as combobox clear/expand and
  image-browser clear). Long values stay in the field’s remaining width instead of
  painting under the button. Standalone (non-slotted) copy buttons are unchanged.
- `<pk-input>` clear control is flex-flow (not absolutely overlaid); trailing chrome
  tokens (`--pk-input-padding-*`, `--pk-input-decoration-size`) are shared with
  in-control end actions.

## 2.0.15 - 2026-09-04

### Fixed
- Idempotent `@customElement` now actually ships in component builds. The Vite
  alias alone never applied when `lit` is external — published chunks still
  imported Lit’s bare decorator and threw `NotSupportedError` when multiple
  Craft plugins each bundled Plugin Kit. Components import `customElement` from
  `src/decorators.ts` (safe `customElements.get` guard) instead.

## 2.0.14 - 2026-08-25

### Added
- `<pk-editable-table>` spreadsheet paste: TSV clipboard (Excel / Sheets) fills from the focused cell and expands rows when `allow-add` / `max-rows` allow — Craft `EditableTable.importData` parity. Single-cell paste and `textarea` cells keep native paste.
- `<pk-editable-table>` optional **Insert above** / **Insert below** in the row ellipsis menu (`allow-insert`, default on). Disabled when add is disallowed.
- `<pk-editable-table>` `max-rows` attribute — hard cap for add / insert / paste expansion (hosts that only toggle `allow-add` after `pk-change` still stay within the cap mid-paste).

## 2.0.13 - 2026-08-25

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
