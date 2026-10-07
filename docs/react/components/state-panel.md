# State Panel

State panels replace a content region when there is nothing to show or the intended content cannot be rendered. Use an [Alert](/react/components/alert) instead when the surrounding interface remains usable and the message is supplementary.

## Empty States

Use the default `empty` variant for a valid absence of content. Explain what is missing and, when useful, place the next step in the `actions` slot.

<ComponentPreview src="./examples/state-panel-empty.preview.tsx" />

## Variants

The variant communicates why the content region was replaced. `empty` is the default for a valid absence of content. Use `info` for explanatory states, `success` for a completed outcome, `warning` when the person should review something, and `error` when the intended content failed. Each variant sets the semantic colour and fallback icon.

<ComponentPreview src="./examples/state-panel-variants.preview.tsx" />

## Icons

Set `icon` to a name registered through the [Icon registry](/react/components/icon) when a state needs a more specific glyph. For fully custom rendered content, including an inline SVG, use the `icon` slot; the slot takes precedence over the `icon` prop. Use `hideIcon` when the heading and message are sufficient without one.

<ComponentPreview src="./examples/state-panel-icons.preview.tsx" />

## Sizes

Use the default size for ordinary panels and slide-outs. `sm` provides a compact replacement state for smaller regions, while `lg` suits a prominent content region. The size scales the icon, type, spacing, details, copy controls, and default-sized action buttons together.

<ComponentPreview src="./examples/state-panel-sizes.preview.tsx" />

## Error States and Details

Use the `error` variant when the panel replaces content that failed to load or render. Technical information belongs in the `details` slot, while the default slot stays safe and useful for the person using the interface. Set `copyable` to add a compact copy button inside the details area. Its icon changes to a check after success, the result is announced, and failures remain visibly explained.

<ComponentPreview src="./examples/state-panel-error.preview.tsx" />

### Scrolling Details

Large diagnostic output scrolls once it reaches the details area's maximum height. The copy control remains inset within the scrolling content, so a native scrollbar only affects its alignment when one is present.

<ComponentPreview src="./examples/state-panel-scrolling-details.preview.tsx" />

Use `announce="polite"` for an asynchronous state change that can wait and `announce="assertive"` only for an urgent failure. Static states should keep the default `announce="off"` value.

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `title` | Custom heading content. Takes precedence over the `heading` property. |
| `icon` | Custom icon. The component supplies a variant icon by default. |
| `(default)` | State description or other primary content. |
| `details` | Optional content inside the collapsible details region. |
| `actions` | Optional buttons or links. |

### Props

| Name | Description |
| --- | --- |
| `announce` | <small><strong>Type</strong> <code>PkStatePanelAnnouncement</code></small><br><small><strong>Default</strong> <code>off</code></small> |
| `copiedLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Details copied.</code></small> |
| `copyable` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `copyErrorLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Copy failed. Select the details and copy them manually.</code></small> |
| `copyLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Copy details</code></small> |
| `detailsLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Details</code></small> |
| `detailsOpen` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `heading` | <small><strong>Type</strong> <code>string</code></small> |
| `headingLevel` | <small><strong>Type</strong> <code>PkStatePanelHeadingLevel</code></small><br><small><strong>Default</strong> <code>2</code></small> |
| `hideIcon` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `icon` | Registered icon name. A custom `icon` slot takes precedence.<br><small><strong>Type</strong> <code>string</code></small> |
| `size` | Overall density, including typography, icons, spacing, details, and actions.<br><small><strong>Type</strong> <code>PkStatePanelSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `variant` | Semantic colour and fallback icon for the replacement state.<br><small><strong>Type</strong> <code>PkStatePanelVariant</code></small><br><small><strong>Default</strong> <code>empty</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `copyDetails()` | Copy the plain text assigned to the details slot. |

### Events

| Name | Description |
| --- | --- |
| `onPkCopy` | Emitted when the details are copied successfully. |
| `onPkCopyError` | Emitted when the details cannot be copied. |

### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-state-panel-accent` | Variant accent colour. |
| `--pk-state-panel-body-color` | Primary content colour. |
| `--pk-state-panel-content-width` | Maximum content width. |
| `--pk-state-panel-details-max-height` | Maximum height of diagnostic details. |
| `--pk-state-panel-icon-background` | Icon container background. |
| `--pk-state-panel-icon-radius` | Icon container radius. |
| `--pk-state-panel-icon-shell-size` | Icon container width and height. |
| `--pk-state-panel-icon-size` | Icon width and height. |
| `--pk-state-panel-min-height` | Minimum component height. |
| `--pk-state-panel-padding` | Component padding. |
| `--pk-state-panel-title-color` | Heading colour. |
| `--pk-state-panel-title-size` | Heading font size. |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `actions` | Actions wrapper. | `::part(actions)` |
| `base` | Centered state container. | `::part(base)` |
| `body` | Default content wrapper. | `::part(body)` |
| `copy-button` | Copy-details button. | `::part(copy-button)` |
| `copy-status` | Copy result status. | `::part(copy-status)` |
| `details` | Collapsible details element. | `::part(details)` |
| `details-content` | Details content wrapper. | `::part(details-content)` |
| `details-summary` | Details disclosure label. | `::part(details-summary)` |
| `icon` | Icon wrapper. | `::part(icon)` |
| `icon-shell` | Icon background container. | `::part(icon-shell)` |
| `title` | State heading. | `::part(title)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-copy-button` | Compact copy-details action. |
| `pk-icon` | — |

<!-- pk-api:end -->
