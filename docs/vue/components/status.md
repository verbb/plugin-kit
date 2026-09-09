# Status

Status indicators provide a compact semantic color cue alongside a short label. They are useful for workflow state, health, visibility, and other lightweight metadata.

## Variants

Status supports semantic and color-oriented variants, including the full set of built-in aliases used across the UI.

<ComponentPreview src="./examples/status-variants.preview.vue.ts" />

<!-- pk-api:begin -->

## API

### Props

| Name | Description |
| --- | --- |
| `ariaLabel` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `status` | <small><strong>Type</strong> <code>PkStatusVariant</code></small><br><small><strong>Default</strong> <code>on</code></small> |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Status dot element | `::part(base)` |

<!-- pk-api:end -->
