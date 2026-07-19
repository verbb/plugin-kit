# Combobox

Comboboxes mix freeform search with constrained option selection.

## Input Mode

Input mode works well when the control should feel like a searchable text field with inline suggestions.

<ComponentPreview src="./examples/combobox-input-mode.preview.tsx" />

## Sizes

The combobox input and option list follow the same sizing rhythm as select so searchable controls can align with adjacent fields.

<ComponentPreview src="./examples/combobox-sizes.preview.tsx" />

## Widths

Combobox input controls use their content width by default. Add a width utility to the input when the control should be fixed-width or fill its parent.

<ComponentPreview src="./examples/combobox-widths.preview.tsx" />

## Popup Mode

Popup mode is a better fit when the trigger should behave more like a select than a text field.

<ComponentPreview src="./examples/combobox-popup-mode.preview.tsx" />

## Multiple Selection

Chips are useful when the chosen options need to remain visible after selection.

<ComponentPreview src="./examples/combobox-multiple.preview.tsx" />

## Grouped Options

Grouped content is useful when the option list should be organized into labeled collections.

<ComponentPreview src="./examples/combobox-grouped.preview.tsx" />

## Allow Create

`allowCreate` offers creating a new option when the typed query isn’t already in the list.

<ComponentPreview src="./examples/combobox-allow-create.preview.tsx" />

## Custom Values

`allowCustomValue` lets a single-select keep typed text that doesn’t match an option.

<ComponentPreview src="./examples/combobox-allow-custom-value.preview.tsx" />

## Higher-Level Input API

`ComboboxInput` provides a field-style API for the common single and async loading cases.

<ComponentPreview src="./examples/combobox-high-level-input.preview.tsx" />

## Async Search

When using `ComboboxInput`, pass `fetchOptions={(query) => ...}` without a static `options` array to enable async search mode automatically.

For large datasets, load matches from a remote source as the user types.
<ComponentPreview src="./examples/combobox-async-search.preview.tsx" />
