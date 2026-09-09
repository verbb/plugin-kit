# Checkbox Select

`CheckboxSelect` is a compact multi-select checklist. Pass options as a JSON `options` prop (or the `options` property in JS) — it does **not** take slotted `Checkbox` children. Wrap in `Field` when you need a Craft-style label and instructions.

## Basic Usage

Multiple selection with a concrete `value` array.

<ComponentPreview src="./examples/checkbox-select-basic.preview.tsx" />

## All Option

`show-all-option` adds a master checkbox. Checking it sets `value` to `"*"`.

<ComponentPreview src="./examples/checkbox-select-all-option.preview.tsx" />

## All Selected

Use `value="*"` when every option should be treated as selected without storing each id.

<ComponentPreview src="./examples/checkbox-select-all-selected.preview.tsx" />

## Selected Values

Use a JSON string array when the setting stores a concrete set of selected options.

<ComponentPreview src="./examples/checkbox-select-selected-values.preview.tsx" />

## Field Layout

Labels and instructions belong on `Field` around the control.

<ComponentPreview src="./examples/checkbox-select-field-layout.preview.tsx" />

## Disabled States

Disable the whole group when the selection is present for context but locked.

<ComponentPreview src="./examples/checkbox-select-disabled-states.preview.tsx" />

## Long Lists

Longer option labels still stack cleanly in the default vertical orientation.

<ComponentPreview src="./examples/checkbox-select-long-list.preview.tsx" />

<!-- pk-api:begin -->

## API

### Props

| Name | Description |
| --- | --- |
| `allLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>All</code></small> |
| `ariaLabel` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `options` | <small><strong>Type</strong> <code>PkCheckboxSelectOption[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `orientation` | <small><strong>Type</strong> <code>PkCheckboxSelectOrientation</code></small><br><small><strong>Default</strong> <code>vertical</code></small> |
| `showAllOption` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `value` | Selected values, or `*` when the All option is active.<br><small><strong>Type</strong> <code>PkCheckboxSelectValue</code></small><br><small><strong>Default</strong> <code>[]</code></small> |

### Events

| Name | Description |
| --- | --- |
| `onChange` | — |
| `onPkChange` | `{ value: string[] \| '*' }` Some facades also expose value sugar via `onChange`. |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Checkbox options container | `::part(base)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-checkbox` | — |

<!-- pk-api:end -->
