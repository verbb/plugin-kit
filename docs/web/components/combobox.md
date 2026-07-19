# Combobox

Comboboxes mix freeform search with constrained option selection.

## Input Mode

Input mode works well when the control should feel like a searchable text field with inline suggestions.

<ComponentPreview src="./examples/combobox-input-mode.preview.web.ts" />

## Sizes

The combobox input and option list follow the same sizing rhythm as select so searchable controls can align with adjacent fields.

<ComponentPreview src="./examples/combobox-sizes.preview.web.ts" />

## Widths

Combobox input controls use their content width by default. Add a width utility to the input when the control should be fixed-width or fill its parent.

<ComponentPreview src="./examples/combobox-widths.preview.web.ts" />

## Popup Mode

Popup mode is a better fit when the trigger should behave more like a select than a text field.

<ComponentPreview src="./examples/combobox-popup-mode.preview.web.ts" />

## Multiple Selection

Chips are useful when the chosen options need to remain visible after selection.

<ComponentPreview src="./examples/combobox-multiple.preview.web.ts" />

## Grouped Options

Grouped content is useful when the option list should be organized into labeled collections.

<ComponentPreview src="./examples/combobox-grouped.preview.web.ts" />

## Allow Create

`allow-create` offers creating a new option when the typed query isn’t already in the list.

<ComponentPreview src="./examples/combobox-allow-create.preview.web.ts" />

## Custom Values

`allow-custom-value` lets a single-select keep typed text that doesn’t match an option.

<ComponentPreview src="./examples/combobox-allow-custom-value.preview.web.ts" />

## Higher-Level Input API

`pk-combobox` covers the common single-select and async loading cases — static `pk-option` children for local lists, or `async` + `fetchOptions` when results come from a remote search.

<ComponentPreview src="./examples/combobox-high-level-input.preview.web.ts" />

## Async Search

Set `async` and assign `fetchOptions={(query, signal) => ...}` (a JS property) so options load as the user types. No static `pk-option` children are needed — the control owns loading and empty states.

<ComponentPreview src="./examples/combobox-async-search.preview.web.ts" />

