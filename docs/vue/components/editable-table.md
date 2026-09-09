# Editable Table

Editable tables are useful when related values need to be authored in rows instead of isolated fields.

## Mixed Field Types

An editable table can combine text, selects, booleans, colors, dates, and longer freeform notes in the same row model.

<ComponentPreview src="./examples/editable-table-mixed-field-types.preview.vue.ts" />

## Cell Validation

Validation can be targeted per cell by combining a `fieldName` with a `cellErrors` map.

<ComponentPreview src="./examples/editable-table-cell-validation.preview.vue.ts" />

## Derived Columns

Handle and value columns can derive from a source field without overwriting existing content.

<ComponentPreview src="./examples/editable-table-derived-columns.preview.vue.ts" />

## Compact Selection Columns

Use `thin` checkbox columns or radio-style exclusivity when the table is modeling option lists.

<ComponentPreview src="./examples/editable-table-compact-selection.preview.vue.ts" />

<!-- pk-api:begin -->

## API

### Props

| Name | Description |
| --- | --- |
| `addRowLabel` | <small><strong>Type</strong> <code>string</code></small> |
| `allowAdd` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `allowDelete` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `allowInsert` | Show Insert above / Insert below in the row ellipsis menu. Insert still requires `allowAdd` (disabled at max rows when the host turns add off).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `allowReorder` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `cellErrors` | Errors keyed by `${rowIndex}.${columnName}` or `${fieldName}.${rowIndex}.${columnName}`.<br><small><strong>Type</strong> <code>Record<string, string[] \| string></code></small><br><small><strong>Default</strong> <code>{}</code></small> |
| `customError` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `fieldName` | Optional form-field prefix for `cellErrors` keys. Looks up `${fieldName}.${rowIndex}.${columnName}` then falls back to `${rowIndex}.${columnName}`.<br><small><strong>Type</strong> <code>string</code></small> |
| `getRowMenuItems` | Extra ellipsis-menu items for a row (data descriptors — not React nodes). Selection fires `pk-row-menu-select` with `{ rowIndex, row, item, action, value }`.<br><small><strong>Type</strong> <code>PkEditableTableGetRowMenuItems \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `maxRows` | Optional hard cap on row count. When set, add / insert / paste expansion stop at this length even if `allowAdd` is still true mid-batch.<br><small><strong>Type</strong> <code>number \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `modifyColumn` | Per-cell column override (e.g. swap value column to a select based on another cell). Return a partial column merged over the base definition for that render.<br><small><strong>Type</strong> <code>PkEditableTableModifyColumn \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `modifyRow` | Per-row chrome — class / accessible name / tone on the `<tr>`.<br><small><strong>Type</strong> <code>PkEditableTableModifyRow \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `newRowDefaults` | Merged into each newly added row after column defaults.<br><small><strong>Type</strong> <code>Record<string, unknown></code></small><br><small><strong>Default</strong> <code>{}</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `checkValidity()` | Runs constraint validation without showing the browser UI. |
| `reportValidity()` | Runs constraint validation and shows the browser UI when invalid. |
| `resetValidity()` | Clears custom errors and re-syncs validity state. |
| `setCustomValidity(message: string)` | Sets or clears a custom validation message. |

### Events

| Name | Description |
| --- | --- |
| `@change` | — |
| `@input` | — |
| `@pk-cell-change` | — |
| `@pk-change` | — |
| `@pk-row-menu-select` | — |

### Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `disabled` | The control is disabled. | `:state(disabled)` |
| `invalid` | The control currently fails constraint validation. | `:state(invalid)` |
| `optional` | The control is not required. | `:state(optional)` |
| `required` | The control is required. | `:state(required)` |
| `user-invalid` | Invalid after the user has interacted with the control. | `:state(user-invalid)` |
| `user-valid` | Valid after the user has interacted with the control. | `:state(user-valid)` |
| `valid` | The control currently passes constraint validation. | `:state(valid)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-button` | — |
| `pk-checkbox` | — |
| `pk-color-input` | — |
| `pk-combobox` | — |
| `pk-date-picker` | — |
| `pk-dropdown-item` | — |
| `pk-dropdown-menu` | — |
| `pk-input` | — |
| `pk-lightswitch` | — |
| `pk-option` | — |
| `pk-select` | — |
| `pk-textarea` | — |
| `pk-time-picker` | — |

<!-- pk-api:end -->
