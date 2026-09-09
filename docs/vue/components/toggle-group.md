# Toggle Group

Toggle groups combine several related toggles into a single toolbar-like control. They work well for alignment, text formatting, and other compact grouped choices.

## Basic Usage

Use a joined horizontal group for the most common compact toolbar pattern.

<ComponentPreview src="./examples/toggle-group-basic.preview.vue.ts" />

## Variants

Variant changes help the same group pattern fit different control hierarchies.

<ComponentPreview src="./examples/toggle-group-variants.preview.vue.ts" />

## Sizes

Size changes help the same group pattern fit both dense editors and more prominent control areas.

<ComponentPreview src="./examples/toggle-group-sizes.preview.vue.ts" />

## Orientation

Orientation lets the same interaction work as either a joined toolbar or a vertical control stack.

<ComponentPreview src="./examples/toggle-group-orientation.preview.vue.ts" />

## Spacing

Spacing can loosen the group when the items should read as related controls without touching edges.

<ComponentPreview src="./examples/toggle-group-spacing.preview.vue.ts" />

## Selection Modes

Use single selection for mutually exclusive choices, and multiple selection for independent formatting-style choices.

<ComponentPreview src="./examples/toggle-group-selection.preview.vue.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `(default)` | `pk-toggle` or `button[data-value]` items |

### Props

| Name | Description |
| --- | --- |
| `joined` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `multiple` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `orientation` | <small><strong>Type</strong> <code>PkToggleGroupOrientation</code></small><br><small><strong>Default</strong> <code>horizontal</code></small> |
| `size` | <small><strong>Type</strong> <code>PkToggleSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `spacing` | Gap between items — `0` joins adjacent toggles (React `spacing={0}`).<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `variant` | <small><strong>Type</strong> <code>PkToggleVariant</code></small><br><small><strong>Default</strong> <code>default</code></small> |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Group container | `::part(base)` |

<!-- pk-api:end -->
