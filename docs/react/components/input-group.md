# Input Group

`InputGroup` composes a field control with prefix/suffix addons (icons, text, or buttons). Put the control first in the DOM, then addons — use `align` to place them visually.

For a single leading/trailing glyph **inside** a field border, prefer `Input` slots instead. Use an input group when the adornment is a separate addon or a control.

## Icon Addons

Default addon alignment is start; use `align="inline-end"` for a trailing icon.

<ComponentPreview src="./examples/input-group-icon.preview.tsx" />

## Text Addons

Prefix and suffix copy via `InputGroupText` inside aligned addons.

<ComponentPreview src="./examples/input-group-text.preview.tsx" />

## Button Addon

Combine a text prefix with an inline `InputGroupButton`.

<ComponentPreview src="./examples/input-group-button.preview.tsx" />

<!-- pk-api:begin -->

## API

### InputGroup

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Input controls and addons |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Group shell | `::part(base)` |

### InputGroupAddon

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Addon content |

#### Props

| Name | Description |
| --- | --- |
| `align` | <small><strong>Type</strong> <code>PkInputGroupAddonAlign</code></small><br><small><strong>Default</strong> <code>inline-start</code></small> |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Addon container | `::part(base)` |

### InputGroupButton

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Button label or icon |

#### Props

| Name | Description |
| --- | --- |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>PkInputGroupButtonSize</code></small><br><small><strong>Default</strong> <code>xs</code></small> |
| `variant` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>none</code></small> |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Button element | `::part(base)` |

### InputGroupInput

#### Props

| Name | Description |
| --- | --- |
| `autocomplete` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `placeholder` | <small><strong>Type</strong> <code>string</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `readOnly` | Alias for `readonly`. |
| `size` | <small><strong>Type</strong> <code>PkInputGroupInputSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `type` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>text</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |

#### Events

| Name | Description |
| --- | --- |
| `onChange` | — |
| `onInput` | — |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `input` | Native input element | `::part(input)` |

### InputGroupText

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Text content |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Text container | `::part(base)` |

<!-- pk-api:end -->
