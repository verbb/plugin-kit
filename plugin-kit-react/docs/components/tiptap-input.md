# TiptapInput

TiptapInput provides a compact inline rich-text field with optional variable insertion. It is useful for subjects, placeholders, formulas, and other short authoring surfaces that still need structured tokens.

## Plain Input

Without variable categories, TiptapInput behaves like a compact rich-text capable inline authoring field.

<ComponentPreview src="./examples/tiptap-input-plain.preview.tsx" />

## General Variables

Use general variables when users need access to form, submission, system, site, or timestamp tokens in addition to field references.

<ComponentPreview src="./examples/tiptap-input-general-variables.preview.tsx" />

## Field Variables

Use a field-only variable set when the input should stay constrained to form data references.

<ComponentPreview src="./examples/tiptap-input-field-variables.preview.tsx" />

## Email Variables

More constrained variable sets are useful for inputs like email destinations.

<ComponentPreview src="./examples/tiptap-input-email-variables.preview.tsx" />

## Selector Fields

Selector-aware field references are useful when users need to drill into nested field data.

<ComponentPreview src="./examples/tiptap-input-selector-fields.preview.tsx" />

## States

Use invalid, disabled, and read-only states when the input participates in form validation or locked settings.

<ComponentPreview src="./examples/tiptap-input-states.preview.tsx" />
