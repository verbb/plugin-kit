# Time Picker

Time pickers provide a compact controlled input for choosing one time value.

## Basic Usage

Use a controlled value when the selected time needs to stay in sync with broader form state.

<ComponentPreview src="./examples/time-picker-basic.preview.web.ts" />

## Empty State

An empty placeholder is useful when the time should be chosen explicitly rather than prefilled.

<ComponentPreview src="./examples/time-picker-empty.preview.web.ts" />

## States

Show invalid and disabled states when the picker is used inside forms.

<ComponentPreview src="./examples/time-picker-states.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `start` | Overrides the default clock icon |
| `(default)` | Additional `pk-option` items append after the generated list |
| `end` | Presentational decoration before the expand chevron |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `ariaLabel` `aria-label` | Accessible name for the trigger when no visible label is present.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `clearable` | Alias of `with-clear` — shows a clear control when the value is non-empty.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `customError` `custom-error` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` `default-value` | Initial value before user interaction (form reset baseline).<br><small><strong>Type</strong> <code>string</code></small> |
| `defaultValues` | Initial multi values before user interaction. Property-only.<br><small><strong>Type</strong> <code>string[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | Marks the control invalid (visual + ARIA).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `loopFocus` `loop-focus` | Whether arrow-key focus loops from the last option back to the first (and vice versa). Base UI `Select` has no equivalent; default: `false`.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `multiple` | Allow more than one option to be selected (tag display).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `open` | Whether the listbox is open. Prefer `show()` / `hide()` for animated transitions.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `placeholder` | Prompt shown when nothing is selected. Empty by default.<br><small><strong>Type</strong> <code>string</code></small> |
| `placement` | Preferred listbox placement; may flip to stay in viewport.<br><small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>bottom-start</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `sideOffset` `side-offset` | Gap between the trigger and listbox panel in px.<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `size` | Shared CP size scale for the closed trigger and list items.<br><small><strong>Type</strong> <code>PkSelectSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `value` | Selected value (single-select). Empty string when cleared.<br><small><strong>Type</strong> <code>string</code></small> |
| `values` | Selected values when `multiple` is set. Property-only (not an attribute).<br><small><strong>Type</strong> <code>string[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `width` | When `full`, the trigger stretches to the host width.<br><small><strong>Type</strong> <code>'full' \| undefined</code></small> |
| `withClear` `with-clear` | Shows a clear control when the value is non-empty.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `checkValidity()` | Runs constraint validation without showing the browser UI. |
| `hide(source: PkOverlaySource)` | Closes the listbox. |
| `reportValidity()` | Runs constraint validation and shows the browser UI when invalid. |
| `resetValidity()` | Clears custom errors and re-syncs validity state. |
| `setCustomValidity(message: string)` | Sets or clears a custom validation message. |
| `show()` | Opens the listbox. |

### Events

| Name | Description |
| --- | --- |
| `change` | Native change event when the selection changes. |
| `input` | Native input event when the selection changes. |
| `pk-after-hide` | Emitted after the listbox closes and exit motion finishes. |
| `pk-after-show` | Emitted after the listbox opens and enter motion finishes. |
| `pk-change` | `detail.value`<br><small><strong>Type</strong> <code>{ value: string, values: string[] }</code></small> |
| `pk-clear` | Emitted when the value is cleared via the clear control. |
| `pk-hide` | Emitted when the listbox begins to close (cancelable).<br><small><strong>Type</strong> <code>{ source: string }</code></small> |
| `pk-invalid` | Emitted when constraint validation fails. |
| `pk-open-change` | Emitted when `open` changes after show/hide settles.<br><small><strong>Type</strong> <code>{ open: boolean }</code></small> |
| `pk-show` | Emitted when the listbox begins to open. |

### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-select-anchor-width` | Panel min-width; set from the trigger width while open. |
| `--pk-select-decoration-size` | Start/end decoration glyph size.<br><small><strong>Default</strong> <code>0.875rem</code></small> |
| `--pk-select-fill` | Closed trigger background.<br><small><strong>Default</strong> <code>var(--pk-color-slate-250)</code></small> |
| `--pk-select-fill-hover` | Closed trigger hover background.<br><small><strong>Default</strong> <code>var(--pk-color-slate-300)</code></small> |

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

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `control` | Trigger control wrapper | `::part(control)` |
| `end` | Host end decoration container | `::part(end)` |
| `panel` | Listbox panel | `::part(panel)` |
| `start` | Host start decoration container | `::part(start)` |
| `trigger` | Select trigger button | `::part(trigger)` |
| `trigger-start` | Mirrored start decoration from the selected option | `::part(trigger-start)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-option` | — |

<!-- pk-api:end -->
