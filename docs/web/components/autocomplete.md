# Autocomplete

Freeform text with optional suggestions. The committed value *is* the input text —
choosing a suggestion inserts it; any typed value is valid.

Consumers supply `pk-option` children (or `async` + `fetchOptions`).

Prefer **Autocomplete** when the typed text *is* the value and suggestions only
help complete it. Prefer **Combobox** when the field stores a selected option
(and typing is just for filtering) — not freeform custom text.

## Basic

Focus the field and type to filter, or pick a suggestion. Keep typing past a
suggestion — freeform values stay committed.

<ComponentPreview src="./examples/autocomplete-basic.preview.web.ts" />

## Clearable

<ComponentPreview src="./examples/autocomplete-clearable.preview.web.ts" />

## Grouped suggestions

Organize suggestions with labeled option groups when the list benefits from sections.

<ComponentPreview src="./examples/autocomplete-grouped.preview.web.ts" />

## Async suggestions

Remote (or plugin) search via `async` + `fetchOptions`. Typing still commits freely;
results only help complete the value.

<ComponentPreview src="./examples/autocomplete-async.preview.web.ts" />

## With Field warning

Existence checks belong to the plugin. Field chrome can show a soft warning while
still saving a path that does not exist yet.

<ComponentPreview src="./examples/autocomplete-field-warning.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `start` | Presentational decoration before the input (e.g. icons) |
| `end` | Presentational decoration before the clear control |
| `(default)` | `pk-option` and `pk-option-group` items |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `ariaLabel` `aria-label` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `async` | When true, options are loaded via `fetchOptions` as the user types instead of filtering static `pk-option` children.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `autoHighlight` `auto-highlight` | When true, the first matching option is highlighted on open or when filtering.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `clearable` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `customError` `custom-error` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` `default-value` | <small><strong>Type</strong> <code>string</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `emptyMessage` `empty-message` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>No options found.</code></small> |
| `fetchOptions` | Remote search handler — `(query, signal) => Promise<options>`.<br><small><strong>Type</strong> <code>PkAutocompleteFetchHandler \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `filter` | Custom filter — `(option, query) => boolean`. Defaults to label/value substring match.<br><small><strong>Type</strong> <code>PkAutocompleteFilter \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `instructions` | <small><strong>Type</strong> <code>string</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `loadingMessage` `loading-message` | Message shown while async results are loading.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Searching…</code></small> |
| `loopFocus` `loop-focus` | Whether arrow-key focus loops from the last option back to the first (and vice versa). Default: `true` (same as Combobox).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `open` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `placeholder` | Empty by default — consumers opt in when a prompt is useful.<br><small><strong>Type</strong> <code>string</code></small> |
| `placement` | <small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>bottom-start</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `sideOffset` `side-offset` | Gap between the control and listbox panel in px (default: 6).<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>6</code></small> |
| `size` | <small><strong>Type</strong> <code>PkAutocompleteSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `startTypingMessage` `start-typing-message` | Message shown before the user types in async mode.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Start typing to search…</code></small> |
| `value` | Freeform field value — always mirrors the visible input text.<br><small><strong>Type</strong> <code>string</code></small> |
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

### Events

| Name | Description |
| --- | --- |
| `change` | — |
| `input` | — |
| `pk-change` | — |
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
| `clear-button` | Clear value button | `::part(clear-button)` |
| `control` | Input control wrapper | `::part(control)` |
| `empty` | Empty-state message | `::part(empty)` |
| `end` | Host end decoration container | `::part(end)` |
| `input` | Autocomplete text input | `::part(input)` |
| `panel-body` | Scrollable listbox region inside the popup panel | `::part(panel-body)` |
| `start` | Host start decoration container | `::part(start)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-popup` | Positioned suggestion panel host. |

<!-- pk-api:end -->
