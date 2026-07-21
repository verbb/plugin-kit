# Changelog

## Unreleased

### Fixed
- Slotted menu/button/option/tab labels inherit kit size-token type metrics from the web-component host (lockstep with `@verbb/plugin-kit-web` slotted-host fix). No React API change.

## 2.0.3 - 2026-07-19

### Changed
- Restored lockstep versioning across all `@verbb/plugin-kit-*` packages after interim `2.0.1` / `2.0.2` drift.

## 2.0.0 - 2026-07-19

### Changed
- Rebuilt `@verbb/plugin-kit-react` as thin React facades over `@verbb/plugin-kit-web` custom elements (Lit + shadow DOM). Look, behaviour, and accessibility live in the web package.
- Canonical bootstrap is React `createRoot` + `PluginKitProvider`. Importing a facade registers its custom element — no `createReactApp` / `registerAll` step.
- `mountShadowApp` and opt-in `createCraftHostBridge` live under `@verbb/plugin-kit-react/utils` (shadow helpers are implemented in `@verbb/plugin-kit-web`).
- SchemaForm UI bindings stay on `@verbb/plugin-kit-react/forms`; shared store/validation lives in `@verbb/plugin-kit-forms`.
- Package versions lockstep with `@verbb/plugin-kit-web`, `@verbb/plugin-kit-forms`, `@verbb/plugin-kit-vue`, and related `@verbb/plugin-kit-*` packages at `2.0.0`.

### Removed
- Removed the Base UI / full React component implementation. Use the facade exports over `<pk-*>` elements instead.
- Removed React-only EditableTable compound APIs (`renderCell`, `modifyColumn`, dnd-kit row stack). Configure columns on `<EditableTable>` / `<pk-editable-table>`, or compose outside the table.

## 1.0.10 - 2026-07-09

### Added
- Added `requiredRichText` validation rule for schema fields that store TipTap/ProseMirror JSON, so empty rich-text documents (including `[]` and bare paragraph nodes) are treated as blank.
- Added `isRichTextEmpty` utility to detect when stored TipTap content has no user-visible text (exported from `@verbb/plugin-kit-react/utils`).

### Changed
- Changed validation engines to treat both `required` and `requiredRichText` as required-field rules for dependency and shortcut logic.

### Fixed
- Fixed `translate()` failing validation when Craft's translation helper throws (for example missing translation keys), falling back to the raw message instead.

## 1.0.9 - 2026-07-02

### Changed
- Changed `DropdownMenuContent` to default to `positionMethod="fixed"` when portaling into a Shadow DOM container, and added an optional `positionMethod` prop to override the default.

### Fixed
- Fixed dropdown menus rendering with a large positional offset inside Shadow DOM apps such as the Formie form builder.
- Fixed `PaneTabsContent` showing a focus ring when the tab panel received focus, leaving focus styling on the tab trigger only.

## 1.0.8 - 2026-06-23

### Added
- Added a translation icon to `FieldLayout` for schema fields marked `translatable`.
- Added `TranslationIcon` for host apps that need the same translatable-field affordance outside `FieldLayout`.
- Added `translatable` support to `TextField`, `TextareaField`, and `RichTextField`.
- Added `className` support to `ListField`.

### Fixed
- Fixed `SelectField` ignoring the schema `disabled` property and leaving the select interactive when it should be read-only.

## 1.0.7 - 2026-06-18

### Added
- Added datetime helpers (`parseDateTimeValue`, `parseLocalDate`, `formatDateTimeValue`, `resolveCalendarMonth`, and `startOfMonth`) for wall-clock `Y-m-d H:i:s` values without timezone conversion.
- Exported the datetime helpers from `@verbb/plugin-kit-react/utils`.

### Changed
- Changed `DatePicker` to parse values with `parseLocalDate`, keep the visible calendar month in sync with the selected date, and reopen on that month when the popover opens.
- Changed `DateTimeField` to read and write Craft-style wall-clock datetime strings through the form engine instead of maintaining mirrored local state or emitting ISO UTC values.
- Changed `PopoverContent` and `SelectContent` to default to `positionMethod="fixed"` when portaling into a Shadow DOM container.
- Changed `SelectContent` to accept an optional `positionMethod` prop.
- Changed `TimePicker` to use `alignItemWithTrigger={false}` so its dropdown stays aligned in scrollable embedded CP panes.

### Fixed
- Fixed `DatePicker` opening on the current month instead of the selected date’s month.
- Fixed `DateTimeField` shifting dates and times when values were formatted with `toISOString()`.
- Fixed `DateTimeField` causing a React maximum update depth error while saving forms.
- Fixed `TimePicker` and other select popovers rendering with a large positional offset inside Shadow DOM apps such as the Formie form builder.

## 1.0.6 - 2026-06-14

### Added
- Added `ensureDocumentScrollStability()` and wire it into `configurePluginKitReact()` for Shadow DOM apps, reserving document scrollbar space so Base UI modal scroll lock does not shift Craft CP layouts.

### Changed
- Changed `SelectInput` to default to `modal={true}` for outside pointer isolation while keeping `alignItemWithTrigger={false}` to avoid the extra scroll-lock path that caused layout jumps in embedded CP panes.
- Added an `alignItemWithTrigger` prop to `SelectInput` for cases that need the expand-to-trigger animation.

## 1.0.5 - 2026-06-12

### Fixed
- Fix Combobox overflow-x handling.

## 1.0.4 - 2026-06-10

### Added
- Added `CodeEditor`, a CodeMirror 6-based code surface for HTML and plain text with line numbers, tab sizing, and validation styling.
- Added `CodeEditorField` (`codeEditor`) for SchemaForm string fields that need syntax-aware editing.
- Added `TiptapContent`, a read-only TipTap renderer for previews and summaries that accepts the same value shapes as `RichTextField`.

### Fixed
- Add icon support to Combobox.
- Fix dropdown menu icon handling.

## 1.0.2 - 2026-06-07

### Added
- Added `modifyRow` to `EditableTable`, a row-level companion to `modifyColumn`. Host apps can return optional `cellClassName` and `title` values based on row data; these are applied to all data cells in the row and the actions cell when present.
- Added support for `cellClassName` and `title` return values from `modifyColumn`, applied to individual table cell wrappers alongside existing column overrides.

## 1.0.1 - 2026-06-07

### Added
- Added variable tag extension points for custom configure sections and label resolution.
- Added support for preserving custom reference metadata in variable tokens.
- Added support for resolving scoped variable token variants against their base variable option.

### Changed
- Improved Tiptap variable tag configuration so pending token changes preview immediately and are reverted when the popover is dismissed without saving.
- Kept variable token parsing generic so host applications can define their own reference semantics without plugin-kit knowing about them.

### Fixed
- Fixed variable tags showing raw token values instead of matched option labels in some reference-token cases.
- Fixed configured variable tags losing reference metadata when saved with fallback values or transforms.

## 1.0.0

- Initial public release.
