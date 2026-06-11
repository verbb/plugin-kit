# Changelog

## Unreleased

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
