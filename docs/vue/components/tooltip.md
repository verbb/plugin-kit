# Tooltip

Tooltips add lightweight supporting context to a trigger without permanently taking up layout space. They work best for short clarifications, not essential instructions.

## Basic Usage

Pair a trigger with concise tooltip content for short explanatory copy.

<ComponentPreview src="./examples/tooltip-basic.preview.vue.ts" />

## Action Hints

Tooltips are especially useful on compact icon or utility actions where the visible label would otherwise be too noisy.

<ComponentPreview src="./examples/tooltip-action-hints.preview.vue.ts" />

## Placement

Choose the side that keeps the tooltip close to its trigger without covering nearby UI.

<ComponentPreview src="./examples/tooltip-placement.preview.vue.ts" />

## Keyboard Trigger

Tooltips should be available when a user reaches the trigger by keyboard focus.

<ComponentPreview src="./examples/tooltip-keyboard.preview.vue.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `trigger` | Element that receives the tooltip |
| `(default)` | Tooltip content (falls back to `content` attribute) |

### Props

| Name | Description |
| --- | --- |
| `closeDelay` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `content` | <small><strong>Type</strong> <code>string</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `for` | Anchor element id — alternative to the trigger slot.<br><small><strong>Type</strong> <code>string</code></small> |
| `openDelay` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `placement` | <small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>top</code></small> |
| `trigger` | `hover focus` (default) or `manual` for programmatic open only.<br><small><strong>Type</strong> <code>'hover focus' \| 'manual'</code></small><br><small><strong>Default</strong> <code>hover focus</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `hide()` | Closes the tooltip programmatically. |
| `show()` | Opens the tooltip programmatically. |

### Events

| Name | Description |
| --- | --- |
| `@pk-open-change` | — |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `content` | Tooltip body | `::part(content)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-popup` | — |

<!-- pk-api:end -->
