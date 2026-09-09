# Toggle

Toggles represent a binary pressed or unpressed state and are especially useful in formatting toolbars and compact setting controls.

## Basic Usage

A single toggle works well for compact on or off actions with a clear visual pressed state.

<ComponentPreview src="./examples/toggle-basic.preview.vue.ts" />

## Variants

Use visual variants to fit the same interaction into different toolbar hierarchies.

<ComponentPreview src="./examples/toggle-variants.preview.vue.ts" />

## Sizes

Size changes help the same toggle fit both dense and prominent control rows.

<ComponentPreview src="./examples/toggle-sizes.preview.vue.ts" />

## Pressed

Pressed examples make it clear how the control should behave when selected.

<ComponentPreview src="./examples/toggle-pressed.preview.vue.ts" />

## Disabled

Disabled examples show how the control should read when unavailable.

<ComponentPreview src="./examples/toggle-disabled.preview.vue.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Button label or icon content |

### Props

| Name | Description |
| --- | --- |
| `ariaLabel` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `pressed` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>PkToggleSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |
| `variant` | <small><strong>Type</strong> <code>PkToggleVariant</code></small><br><small><strong>Default</strong> <code>default</code></small> |

### Events

| Name | Description |
| --- | --- |
| `@change` | — |
| `@pk-pressed-change` | — |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Toggle button element | `::part(base)` |

<!-- pk-api:end -->
