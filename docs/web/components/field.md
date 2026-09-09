# Field

`pk-field` is Craft-style field layout around a control — label, instructions, errors, warnings, tips, and optional header actions.

## Standalone Labels

Control-level `label` and `instructions` can live on `pk-input` (and similar controls) without wrapping in `pk-field`.

<ComponentPreview src="./examples/field-standalone-labels.preview.web.ts" />

## Errors and Warnings

Use `required`, `warning`, and the `errors` slot around an invalid control. Tip and instruction values can include inline Markdown.

<ComponentPreview src="./examples/field-errors-and-warnings.preview.web.ts" />

## Translatable

`translatable` shows the translation icon beside the field label.

<ComponentPreview src="./examples/field-translatable.preview.web.ts" />

## Tip

`tip` renders helper text below the control.

<ComponentPreview src="./examples/field-tip.preview.web.ts" />

## Header End

Trailing header actions go in `slot="header-end"` — for example a small “Bulk add” button.

<ComponentPreview src="./examples/field-header-end.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `label` | Field label |
| `instructions` | Help text below the label (property values support inline Markdown) |
| `hint` | Alias for `instructions` |
| `header-end` | Extra header actions (React `headerEnd`) |
| `errors` | Custom error content (property values support inline Markdown) |
| `warning` | Warning message (property values support inline Markdown) |
| `tip` | Informational tip below the control (property values support inline Markdown) |
| `(default)` | Field control (`pk-input`, `pk-select`, etc.) |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `for` | Associates the label with a control id in the light DOM.<br><small><strong>Type</strong> <code>string</code></small> |
| `instructions` | <small><strong>Type</strong> <code>string</code></small> |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `required` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `tip` | <small><strong>Type</strong> <code>string</code></small> |
| `translatable` | Shows the translatable-field icon beside the label.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `warning` | <small><strong>Type</strong> <code>string</code></small> |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `control` | Control slot wrapper | `::part(control)` |
| `errors` | Errors list | `::part(errors)` |
| `form-control` | Root wrapper | `::part(form-control)` |
| `header` | Field header row | `::part(header)` |
| `header-end` | Trailing header actions | `::part(header-end)` |
| `instructions` | Instructions region | `::part(instructions)` |
| `label` | Label element | `::part(label)` |
| `tip` | Tip region | `::part(tip)` |
| `warning` | Warning region | `::part(warning)` |

<!-- pk-api:end -->
