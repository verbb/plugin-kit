# Checkbox Select

`pk-checkbox-select` is a compact multi-select checklist. Pass options as a JSON `options` attribute (or the `options` property in JS) — it does **not** take slotted `pk-checkbox` children. Wrap in `pk-field` when you need a Craft-style label and instructions.

## Basic Usage

Multiple selection with a concrete `value` array.

<ComponentPreview src="./examples/checkbox-select-basic.preview.web.ts" />

## All Option

`show-all-option` adds a master checkbox. Checking it sets `value` to `"*"`.

<ComponentPreview src="./examples/checkbox-select-all-option.preview.web.ts" />

## All Selected

Use `value="*"` when every option should be treated as selected without storing each id.

<ComponentPreview src="./examples/checkbox-select-all-selected.preview.web.ts" />

## Selected Values

Use a JSON string array when the setting stores a concrete set of selected options.

<ComponentPreview src="./examples/checkbox-select-selected-values.preview.web.ts" />

## Field Layout

Labels and instructions belong on `pk-field` around the control.

<ComponentPreview src="./examples/checkbox-select-field-layout.preview.web.ts" />

## Disabled States

Disable the whole group when the selection is present for context but locked.

<ComponentPreview src="./examples/checkbox-select-disabled-states.preview.web.ts" />

## Long Lists

Longer option labels still stack cleanly in the default vertical orientation.

<ComponentPreview src="./examples/checkbox-select-long-list.preview.web.ts" />
