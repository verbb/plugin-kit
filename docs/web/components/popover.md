# Popover

Popovers reveal contextual content close to a trigger without fully interrupting the current flow. They work well for quick settings, lightweight explanations, and compact supporting UI.

## Basic Usage

Use a trigger plus content container for the most common contextual popover pattern.

<ComponentPreview src="./examples/popover-basic.preview.web.ts" />

## Placement

Position the popover on the side that best matches the surrounding control.

<ComponentPreview src="./examples/popover-placement.preview.web.ts" />

## Form Content

Use compact form controls when the interaction should stay close to the trigger.

<ComponentPreview src="./examples/popover-form.preview.web.ts" />

## With Arrow

`with-arrow` draws a floating-ui arrow aimed at the trigger. Works with any `placement`.

<ComponentPreview src="./examples/popover-with-arrow.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `trigger` | Popover trigger |
| `(default)` | Popover content |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `anchor` | Live element anchor — use when the target lives in another shadow tree (e.g. TipTap chips). Preferred over `for` / trigger slot when set. Stays in the consumer tree so modal `showModal()` inert does not apply (unlike portaling the panel to a root outside the dialog).<br><small><strong>Type</strong> <code>Element \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `flush` | Drop default panel padding/fixed width so slotted chrome (command lists, etc.) can control its own inset. Consumer outer `p-0` alone cannot reach `.panel`.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `for` | Anchor element id — alternative to the trigger slot.<br><small><strong>Type</strong> <code>string</code></small> |
| `open` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `placement` | <small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>bottom</code></small> |
| `sideOffset` `side-offset` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `withArrow` `with-arrow` | Show a floating-ui arrow on the panel (off by default). Named like other optional chrome (`with-clear`, `with-caret`) — tooltip always paints its own arrow and has no toggle.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

### Events

| Name | Description |
| --- | --- |
| `pk-open-change` | — |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `panel` | Floating content panel | `::part(panel)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-popup` | — |

<!-- pk-api:end -->
