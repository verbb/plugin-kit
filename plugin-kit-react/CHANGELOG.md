# Changelog

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
