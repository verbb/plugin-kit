# Dialog

Dialogs interrupt the current flow to confirm an action, gather focused input, or present short-form detail without leaving the page.

## Basic Usage

Use a trigger, content container, header, and footer to create a straightforward modal action flow.

<ComponentPreview src="./examples/dialog-basic.preview.tsx" />

## Confirmation

Use confirmation dialogs for destructive or high-impact actions. Set `disable-pointer-dismissal` so a backdrop click cannot dismiss by accident.

<ComponentPreview src="./examples/dialog-confirmation.preview.tsx" />

## Scrollable Content

Constrain long content inside the dialog body so actions remain reachable.

<ComponentPreview src="./examples/dialog-scrollable.preview.tsx" />

## Initial Focus

Put `autofocus` on the control that should receive focus when the dialog opens (often the first field).

<ComponentPreview src="./examples/dialog-initial-focus.preview.tsx" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `trigger` | Opens the dialog (optional — use `open` for declarative control) |
| `header` | Custom header region (replaces the built-in `label` header) |
| `label` | Dialog title |
| `footer` | Dialog footer actions |
| `(default)` | Dialog body |

### Props

| Name | Description |
| --- | --- |
| `description` | Optional subtitle under the title in the built-in header (v1 DialogDescription).<br><small><strong>Type</strong> <code>string</code></small> |
| `disablePointerDismissal` | Maps to  `light-dismiss` (inverted).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disableScrollLock` | Skip document scroll lock while open. Useful for labs / rare cases where the page should keep scrolling under the modal (native dialog still traps focus).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `open` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>'default' \| 'wide'</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `withoutBodyPadding` | Opt out of the default 1rem body padding applied when the built-in header is shown. Use for flush layouts (sidebars, full-bleed pickers) that own their own inset.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withoutHeader` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `hide(source: PkOverlaySource)` | — |
| `show(_source: PkOverlaySource)` | Shows the dialog —  `show()`. |

### Events

| Name | Description |
| --- | --- |
| `onPkOpenChange` | — |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `body` | Body region | `::part(body)` |
| `footer` | Footer region | `::part(footer)` |
| `header` | Header region | `::part(header)` |
| `panel` | Native dialog element | `::part(panel)` |

<!-- pk-api:end -->
