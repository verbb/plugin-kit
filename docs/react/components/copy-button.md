# Copy Button

Copy a URL, token, or other value in one click. The canonical pattern nests the
button inside an input’s trailing slot so the action sits in the field chrome.

## Basic Usage

Place `<CopyButton slot="end">` inside `<Input>` (or another control with an end
adornment). Long values stay in the field’s remaining width instead of painting
under the button.

<ComponentPreview src="./examples/copy-button-basic.preview.tsx" />

## Variants

In-control copy uses a compact glyph treatment. Standalone buttons still accept
the usual button variants for toolbars and other chrome outside a field.

<ComponentPreview src="./examples/copy-button-variants.preview.tsx" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `icon` | Copy icon (SVG supplied by the consumer) |

### Props

| Name | Description |
| --- | --- |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `from` | Element id to copy from — `from="el[attr]"` or `from="el.value"`. Takes precedence over `value` when set.<br><small><strong>Type</strong> <code>string</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |
| `variant` | <small><strong>Type</strong> <code>PkButtonVariant</code></small><br><small><strong>Default</strong> <code>transparent</code></small> |

### Events

| Name | Description |
| --- | --- |
| `onPkCopy` | Emitted when text is copied successfully |
| `onPkCopyError` | Emitted when copying fails |
| `onValueToCopy` | <small><strong>Type</strong> <code>PkCopyEvent</code></small> |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `button` | Trigger button | `::part(button)` |
| `success-icon` | Success icon shown after copying | `::part(success-icon)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-button` | — |

<!-- pk-api:end -->
