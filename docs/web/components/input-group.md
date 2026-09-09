# Input Group

`pk-input-group` composes a field control with prefix/suffix addons (icons, text, or buttons). Put the control first in the DOM, then addons — use `align` to place them visually.

For a single leading/trailing glyph **inside** a field border, prefer `pk-input` slots instead. Use an input group when the adornment is a separate addon or a control.

## Icon Addons

Default addon alignment is start; use `align="inline-end"` for a trailing icon.

<ComponentPreview src="./examples/input-group-icon.preview.web.ts" />

## Text Addons

Prefix and suffix copy via `pk-input-group-text` inside aligned addons.

<ComponentPreview src="./examples/input-group-text.preview.web.ts" />

## Button Addon

Combine a text prefix with an inline `pk-input-group-button`.

<ComponentPreview src="./examples/input-group-button.preview.web.ts" />

<!-- pk-api:begin -->

## API

### pk-input-group

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Input controls and addons |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Group shell | `::part(base)` |

### pk-input-group-addon

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Addon content |

#### Attributes & Properties

| Name | Description |
| --- | --- |
| `align` | <small><strong>Type</strong> <code>PkInputGroupAddonAlign</code></small><br><small><strong>Default</strong> <code>inline-start</code></small> |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Addon container | `::part(base)` |

### pk-input-group-button

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Button label or icon |

#### Attributes & Properties

| Name | Description |
| --- | --- |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>PkInputGroupButtonSize</code></small><br><small><strong>Default</strong> <code>xs</code></small> |
| `variant` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>none</code></small> |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Button element | `::part(base)` |

### pk-input-group-input

#### Attributes & Properties

| Name | Description |
| --- | --- |
| `autocomplete` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `placeholder` | <small><strong>Type</strong> <code>string</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>PkInputGroupInputSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `type` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>text</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |

#### Events

| Name | Description |
| --- | --- |
| `change` | — |
| `input` | — |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `input` | Native input element | `::part(input)` |

### pk-input-group-text

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Text content |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Text container | `::part(base)` |

<!-- pk-api:end -->
