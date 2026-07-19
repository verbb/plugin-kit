# Checkbox Select

`CheckboxSelect` is a compact multi-select checklist. Pass options as a JSON `options` prop (or the `options` property in JS) — it does **not** take slotted `Checkbox` children. Wrap in `Field` when you need a Craft-style label and instructions.

## Basic Usage

Multiple selection with a concrete `value` array.

<ComponentPreview src="./examples/checkbox-select-basic.preview.vue.ts" />

## All Option

`show-all-option` adds a master checkbox. Checking it sets `value` to `"*"`.

<ComponentPreview src="./examples/checkbox-select-all-option.preview.vue.ts" />

## All Selected

Use `value="*"` when every option should be treated as selected without storing each id.

<ComponentPreview src="./examples/checkbox-select-all-selected.preview.vue.ts" />

## Selected Values

Use a JSON string array when the setting stores a concrete set of selected options.

<ComponentPreview src="./examples/checkbox-select-selected-values.preview.vue.ts" />

## Field Layout

Labels and instructions belong on `Field` around the control.

<ComponentPreview src="./examples/checkbox-select-field-layout.preview.vue.ts" />

## Disabled States

Disable the whole group when the selection is present for context but locked.

<ComponentPreview src="./examples/checkbox-select-disabled-states.preview.vue.ts" />

## Long Lists

Longer option labels still stack cleanly in the default vertical orientation.

<ComponentPreview src="./examples/checkbox-select-long-list.preview.vue.ts" />
