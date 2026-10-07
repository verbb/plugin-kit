# Copy Button

Copy a URL, token, or other value in one click. A copy icon is supplied by
default and changes to a check briefly after success. The canonical pattern
nests the button inside an input’s trailing slot so the action sits within the
field.

## Basic Usage

Place `<pk-copy-button slot="end">` inside `<pk-input>` (or another control with
an end adornment). Long values stay in the field’s remaining width instead of
painting under the button.

<ComponentPreview src="./examples/copy-button-basic.preview.web.ts" />

## Variants

In-control copy uses a compact glyph treatment. Standalone buttons still accept
the usual button variants for toolbars and other controls outside a field.

<ComponentPreview src="./examples/copy-button-variants.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `icon` | Custom copy icon. The component supplies a copy icon by default. |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `ariaLabel` `aria-label` | Accessible name shown while the copy action is available.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Copy</code></small> |
| `copiedLabel` `copied-label` | Accessible name shown briefly after copying succeeds.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Copied</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `from` | Element id to copy from — `from="el[attr]"` or `from="el.value"`. Takes precedence over `value` when set.<br><small><strong>Type</strong> <code>string</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |
| `variant` | <small><strong>Type</strong> <code>PkButtonVariant</code></small><br><small><strong>Default</strong> <code>transparent</code></small> |

### Events

| Name | Description |
| --- | --- |
| `pk-copy` | Emitted when text is copied successfully |
| `pk-copy-error` | Emitted when copying fails |
| `valueToCopy` | <small><strong>Type</strong> <code>PkCopyEvent</code></small> |

### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-copy-button-background` | Trigger background override. |
| `--pk-copy-button-border-color` | Trigger border colour override. |
| `--pk-copy-button-color` | Trigger foreground colour override. |
| `--pk-copy-button-hover-background` | Trigger hover background override. |
| `--pk-copy-button-hover-border-color` | Trigger hover border colour override. |
| `--pk-copy-button-hover-color` | Trigger hover foreground colour override. |
| `--pk-copy-button-radius` | Trigger corner radius override. |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `button` | Trigger button | `::part(button)` |
| `copy-icon` | Copy icon shown before copying | `::part(copy-icon)` |
| `success-icon` | Success icon shown after copying | `::part(success-icon)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-button` | — |

<!-- pk-api:end -->
