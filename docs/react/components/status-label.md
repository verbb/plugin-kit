# Status Label

StatusLabel displays a status dot and a short label inside a tinted badge, matching Craft's control panel status labels. Use it for workflow states such as Approved, Awaiting review, Paid or Refunded. Use [Status](/react/components/status) when you need a standalone dot beside existing content.

## Semantic Statuses

Set `status` to choose the indicator and colour, and put the visible label inside the component. The label can use your product's terminology independently of the status value: both **Active** and **Approved** below use `active`. The text appears uppercase through CSS; its original casing remains in the content. Without child content, the status value becomes the label.

<ComponentPreview src="./examples/status-label-semantic.preview.tsx" />

`on`, `live`, `active` and `enabled` use teal. `off`, `suspended` and `expired` use red, while `pending` uses orange. `inactive` and `disabled` use a neutral badge with a hollow dot. The default is `gray`; unrecognised values also use neutral styling. StatusLabel supports the same status aliases as Status, including `warning`, `all`, `turquoise`, `grey` and `light`.

## Named Colours

Use a named colour when your workflow does not correspond to a built-in semantic status. For example, `blue` can represent Packed and `purple` can represent Refunded. Always include meaningful text so colour is not the only way to identify the state.

<ComponentPreview src="./examples/status-label-colours.preview.tsx" />

## Selected Surfaces

For a badge on a dark selected surface, set `--pk-status-label-color: white`, `--pk-status-label-neutral-tint: white` and `--pk-status-ring: white` on the container. The coloured tint remains visible behind the label. `--pk-status-label-background` overrides the complete background when a custom surface needs it.

The badge is descriptive text, not an interactive control or a live announcement. Its dot is hidden from assistive technology because the visible label conveys the state.

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Status text. Defaults to the status value; casing is visual only. |

### Props

| Name | Description |
| --- | --- |
| `status` | Semantic status or named colour, independent of the visible label. Unknown values use neutral styling.<br><small><strong>Type</strong> <code>PkStatusVariant</code></small><br><small><strong>Default</strong> <code>gray</code></small> |

### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-status-label-background` | Complete badge background override. |
| `--pk-status-label-color` | Text colour override, including on selected surfaces. |
| `--pk-status-label-neutral-tint` | Base tint for neutral badges; use white on selected surfaces. |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Badge container | `::part(base)` |
| `indicator` | Status dot host | `::part(indicator)` |
| `label` | Visible label | `::part(label)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-status` | — |

<!-- pk-api:end -->
