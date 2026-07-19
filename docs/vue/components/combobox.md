# Combobox

Comboboxes mix freeform search with constrained option selection.

## Input Mode

Input mode works well when the control should feel like a searchable text field with inline suggestions.

<ComponentPreview src="./examples/combobox-input-mode.preview.vue.ts" />

## Sizes

The combobox input and option list follow the same sizing rhythm as select so searchable controls can align with adjacent fields.

<ComponentPreview src="./examples/combobox-sizes.preview.vue.ts" />

## Widths

Combobox input controls use their content width by default. Add a width utility to the input when the control should be fixed-width or fill its parent.

<ComponentPreview src="./examples/combobox-widths.preview.vue.ts" />

## Popup Mode

Popup mode is a better fit when the trigger should behave more like a select than a text field.

<ComponentPreview src="./examples/combobox-popup-mode.preview.vue.ts" />

## Multiple Selection

Chips are useful when the chosen options need to remain visible after selection.

<ComponentPreview src="./examples/combobox-multiple.preview.vue.ts" />

## Grouped Options

Grouped content is useful when the option list should be organized into labeled collections.

<ComponentPreview src="./examples/combobox-grouped.preview.vue.ts" />

## Allow Create

`allowCreate` offers creating a new option when the typed query isn’t already in the list.

<ComponentPreview src="./examples/combobox-allow-create.preview.vue.ts" />

## Custom Values

`allowCustomValue` lets a single-select keep typed text that doesn’t match an option.

<ComponentPreview src="./examples/combobox-allow-custom-value.preview.vue.ts" />

## Higher-Level Input API

`Combobox` covers the common single-select and async loading cases — static `Option` children for local lists, or `async` + `fetchOptions` when results come from a remote search.

<ComponentPreview src="./examples/combobox-high-level-input.preview.vue.ts" />

## Async Search

Set `async` and assign `fetchOptions={(query, signal) => ...}` (a JS property) so options load as the user types. No static `Option` children are needed — the control owns loading and empty states.

<ComponentPreview src="./examples/combobox-async-search.preview.vue.ts" />
