# Select

Selects expose a constrained list of options while keeping the closed trigger aligned with surrounding field controls.

## Basic Usage

Use a trigger plus content list for the common closed-select pattern.

<ComponentPreview src="./examples/select-basic.preview.tsx" />

## Sizes

The select trigger follows the same sizing rhythm as other form controls so it can sit cleanly beside inputs, buttons, and other CP fields.

<ComponentPreview src="./examples/select-sizes.preview.tsx" />

## Widths

Select triggers use their content width by default. Add a width utility to the trigger when the control should be fixed-width or fill its parent.

<ComponentPreview src="./examples/select-widths.preview.tsx" />

## Grouped Options

Labels and separators help when a single list includes more than one logical option set.

<ComponentPreview src="./examples/select-grouped.preview.tsx" />

## Decorations

Host `start` / `end` slots decorate the closed trigger (icons, status dots, and similar).

<ComponentPreview src="./examples/select-decorations.preview.tsx" />

## Status Options

Put `Status` in an option’s `start` slot when the list represents Craft-like statuses.

<ComponentPreview src="./examples/select-status-input.preview.tsx" />

<!-- pk-api:begin -->

## API

### Select

#### Slots

| Name | Description |
| --- | --- |
| `start` | Presentational decoration before the trigger label (e.g. icons) |
| `end` | Presentational decoration before the expand chevron |
| `(default)` | `pk-option` and `pk-option-group` items |

#### Props

| Name | Description |
| --- | --- |
| `ariaLabel` | Accessible name for the trigger when no visible label is present.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `clearable` | Alias of `with-clear` — shows a clear control when the value is non-empty.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `customError` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` | Initial value before user interaction (form reset baseline).<br><small><strong>Type</strong> <code>string</code></small> |
| `defaultValues` | Initial multi values before user interaction. Property-only.<br><small><strong>Type</strong> <code>string[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | Marks the control invalid (visual + ARIA).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `loopFocus` | Whether arrow-key focus loops from the last option back to the first (and vice versa). Base UI `Select` has no equivalent; default: `false`.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `multiple` | Allow more than one option to be selected (tag display).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `open` | Whether the listbox is open. Prefer `show()` / `hide()` for animated transitions.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `placeholder` | Prompt shown when nothing is selected. Empty by default.<br><small><strong>Type</strong> <code>string</code></small> |
| `placement` | Preferred listbox placement; may flip to stay in viewport.<br><small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>bottom-start</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `sideOffset` | Gap between the trigger and listbox panel in px.<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `size` | Shared CP size scale for the closed trigger and list items.<br><small><strong>Type</strong> <code>PkSelectSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `value` | Selected value (single-select). Empty string when cleared.<br><small><strong>Type</strong> <code>string</code></small> |
| `values` | Selected values when `multiple` is set. Property-only (not an attribute).<br><small><strong>Type</strong> <code>string[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `width` | When `full`, the trigger stretches to the host width.<br><small><strong>Type</strong> <code>'full' \| undefined</code></small> |
| `withClear` | Shows a clear control when the value is non-empty.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

#### Methods

| Name | Description |
| --- | --- |
| `checkValidity()` | Runs constraint validation without showing the browser UI. |
| `hide(source: PkOverlaySource)` | Closes the listbox. |
| `reportValidity()` | Runs constraint validation and shows the browser UI when invalid. |
| `resetValidity()` | Clears custom errors and re-syncs validity state. |
| `setCustomValidity(message: string)` | Sets or clears a custom validation message. |
| `show()` | Opens the listbox. |

#### Events

| Name | Description |
| --- | --- |
| `onChange` | Native change event when the selection changes. |
| `onInput` | Native input event when the selection changes. |
| `onPkAfterHide` | Emitted after the listbox closes and exit motion finishes. |
| `onPkAfterShow` | Emitted after the listbox opens and enter motion finishes. |
| `onPkChange` | Emitted when the selection changes. Some facades also expose value sugar via `onChange`.<br><small><strong>Type</strong> <code>{ value: string, values: string[] }</code></small> |
| `onPkClear` | Emitted when the value is cleared via the clear control. |
| `onPkHide` | Emitted when the listbox begins to close (cancelable).<br><small><strong>Type</strong> <code>{ source: string }</code></small> |
| `onPkInvalid` | Emitted when constraint validation fails. |
| `onPkOpenChange` | Emitted when `open` changes after show/hide settles.<br><small><strong>Type</strong> <code>{ open: boolean }</code></small> |
| `onPkShow` | Emitted when the listbox begins to open. |

#### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-select-anchor-width` | Panel min-width; set from the trigger width while open. |
| `--pk-select-decoration-size` | Start/end decoration glyph size.<br><small><strong>Default</strong> <code>0.875rem</code></small> |
| `--pk-select-fill` | Closed trigger background.<br><small><strong>Default</strong> <code>var(--pk-color-slate-250)</code></small> |
| `--pk-select-fill-hover` | Closed trigger hover background.<br><small><strong>Default</strong> <code>var(--pk-color-slate-300)</code></small> |

#### Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `disabled` | The control is disabled. | `:state(disabled)` |
| `invalid` | The control currently fails constraint validation. | `:state(invalid)` |
| `optional` | The control is not required. | `:state(optional)` |
| `required` | The control is required. | `:state(required)` |
| `user-invalid` | Invalid after the user has interacted with the control. | `:state(user-invalid)` |
| `user-valid` | Valid after the user has interacted with the control. | `:state(user-valid)` |
| `valid` | The control currently passes constraint validation. | `:state(valid)` |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `control` | Trigger control wrapper | `::part(control)` |
| `end` | Host end decoration container | `::part(end)` |
| `panel` | Listbox panel | `::part(panel)` |
| `start` | Host start decoration container | `::part(start)` |
| `trigger` | Select trigger button | `::part(trigger)` |
| `trigger-start` | Mirrored start decoration from the selected option | `::part(trigger-start)` |

#### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-popup` | Positioned listbox panel host. |

### Option

#### Slots

| Name | Description |
| --- | --- |
| `start` | Presentational decoration before the label (e.g. `pk-status`). |
| `(default)` | Option label |

#### Props

| Name | Description |
| --- | --- |
| `disabled` | Disables the option so it cannot be selected.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `focusIndex` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>-1</code></small> |
| `hidden` | Hides the option from the list (e.g. filtered combobox results).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `highlighted` | Keyboard / pointer highlight within the listbox.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `label` | Optional short label for the closed trigger / filter identity (v1 itemToStringLabel). When set, preferred over concatenating rich default-slot text (title + subtitle).<br><small><strong>Type</strong> <code>string</code></small> |
| `matchQuery` | When set, the label renders with matching query text highlighted (combobox filter).<br><small><strong>Type</strong> <code>string</code></small> |
| `optionId` | <small><strong>Type</strong> <code>string</code></small> |
| `selected` | Whether this option is currently selected.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `value` | Option value submitted / emitted when selected.<br><small><strong>Type</strong> <code>string</code></small> |

#### Methods

| Name | Description |
| --- | --- |
| `focusControl(preventScroll)` | Focus the option’s inner control (listbox keyboard navigation). |
| `getLabel()` | Label for the closed combobox/select value. Prefers the `label` attribute when set; otherwise default-slot text (excluding `slot="start"`), joined with spaces for multi-node layouts. |

#### Events

| Name | Description |
| --- | --- |
| `onPkOptionHighlight` | Emitted when the option becomes the highlighted item. |
| `onPkOptionSelect` | Emitted when the option is activated (click / Enter). |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `check` | Selected-state check indicator | `::part(check)` |
| `label` | Option label | `::part(label)` |
| `option` | Option button | `::part(option)` |
| `start` | Start decoration container | `::part(start)` |

### OptionGroup

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | `pk-option` items in this group |

#### Props

| Name | Description |
| --- | --- |
| `hidden` | Hides the group and its options.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `label` | Visible group heading above the options.<br><small><strong>Type</strong> <code>string</code></small> |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `label` | Group label | `::part(label)` |

<!-- pk-api:end -->
