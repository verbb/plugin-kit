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

<!-- pk-api:begin -->

## API

### Attributes & Properties

| Name | Description |
| --- | --- |
| `allLabel` `all-label` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>All</code></small> |
| `ariaLabel` `aria-label` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `options` | <small><strong>Type</strong> <code>PkCheckboxSelectOption[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `orientation` | <small><strong>Type</strong> <code>PkCheckboxSelectOrientation</code></small><br><small><strong>Default</strong> <code>vertical</code></small> |
| `showAllOption` `show-all-option` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `value` | Selected values, or `*` when the All option is active.<br><small><strong>Type</strong> <code>PkCheckboxSelectValue</code></small><br><small><strong>Default</strong> <code>[]</code></small> |

### Events

| Name | Description |
| --- | --- |
| `change` | — |
| `pk-change` | `{ value: string[] \| '*' }` |

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
