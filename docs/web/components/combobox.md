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

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `start` | Presentational decoration before the input (e.g. icons) |
| `end` | Presentational decoration before the expand/clear controls |
| `(default)` | `pk-option` and `pk-option-group` items |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `allowCreate` `allow-create` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `allowCustomValue` `allow-custom-value` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `ariaLabel` `aria-label` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `async` | When true, options are loaded via `fetchOptions` as the user types instead of filtering static `pk-option` children.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `autoHighlight` `auto-highlight` | When true, the first matching option is highlighted on open or when filtering.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `clearable` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `customError` `custom-error` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` `default-value` | <small><strong>Type</strong> <code>string</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `emptyMessage` `empty-message` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>No options found.</code></small> |
| `fetchOptions` | Remote search handler — `(query, signal) => Promise<options>`.<br><small><strong>Type</strong> <code>PkComboboxFetchHandler \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `filter` | Custom filter — `(option, query) => boolean`. Defaults to label/value substring match.<br><small><strong>Type</strong> <code>PkComboboxFilter \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `instructions` | <small><strong>Type</strong> <code>string</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `loadingMessage` `loading-message` | Message shown while async results are loading.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Searching…</code></small> |
| `loopFocus` `loop-focus` | Whether arrow-key focus loops from the last option back to the first (and vice versa). Mirrors Base UI `Combobox` — default: `true`.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `multiple` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `open` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `placeholder` | Empty by default — consumers opt in when a prompt is useful.<br><small><strong>Type</strong> <code>string</code></small> |
| `placement` | <small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>bottom-start</code></small> |
| `popupMode` `popup-mode` | When true, the control shows a trigger button and the search field renders inside the popup.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `searchPlaceholder` `search-placeholder` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Search</code></small> |
| `sideOffset` `side-offset` | Gap between the control and listbox panel in px (default: 6).<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>6</code></small> |
| `size` | <small><strong>Type</strong> <code>PkComboboxSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `startTypingMessage` `start-typing-message` | Message shown before the user types in async mode.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Start typing to search…</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |
| `width` | When `full`, the control stretches to the host width.<br><small><strong>Type</strong> <code>'full' \| undefined</code></small> |
| `withClear` `with-clear` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `checkValidity()` | Runs constraint validation without showing the browser UI. |
| `hide(source: PkOverlaySource)` | — |
| `reportValidity()` | Runs constraint validation and shows the browser UI when invalid. |
| `resetValidity()` | Clears custom errors and re-syncs validity state. |
| `setCustomValidity(message: string)` | Sets or clears a custom validation message. |
| `show()` | — |

### Events

| Name | Description |
| --- | --- |
| `change` | — |
| `input` | — |
| `pk-change` | — |
| `pk-create` | Cancelable. Fired before a new option is created when `allow-create` is enabled. |
| `pk-open-change` | — |

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
| `async-status` | Async search status message | `::part(async-status)` |
| `clear-button` | Clear selection button | `::part(clear-button)` |
| `control` | Input control wrapper | `::part(control)` |
| `empty` | Empty-state message | `::part(empty)` |
| `end` | Host end decoration container | `::part(end)` |
| `expand-button` | Toggle listbox button | `::part(expand-button)` |
| `input` | Combobox text input | `::part(input)` |
| `panel-body` | Scrollable listbox region inside the popup panel | `::part(panel-body)` |
| `panel-input` | Popup-mode search input | `::part(panel-input)` |
| `panel-search` | Popup-mode search field container | `::part(panel-search)` |
| `start` | Host start decoration container | `::part(start)` |
| `tag` | Individual multiselect chip | `::part(tag)` |
| `tag-remove` | Chip remove button | `::part(tag-remove)` |
| `tags` | Multiselect chip container | `::part(tags)` |
| `trigger` | Popup-mode trigger button (shows the selected value) | `::part(trigger)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-popup` | — |

<!-- pk-api:end -->
