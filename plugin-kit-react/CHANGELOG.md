# Changelog

## Unreleased

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
