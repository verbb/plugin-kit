# Alert

Alerts draw attention to information that affects the current task. Choose a semantic variant for the message, then add a heading, actions, or expandable details only when they help someone respond.

## Variants

Use `neutral` for supporting information without a status, `info` for contextual guidance, `success` for a completed action, `warning` for a condition that needs attention, and `error` for a failed or blocked action.

<ComponentPreview src="./examples/alert-variants.preview.vue.ts" />

## Appearances

Use `appearance` to change visual emphasis without changing the alert's meaning. `accent` is the default and adds a strong leading border. `filled-outlined` uses a quiet fill and border, `filled` removes the border, `outlined` removes the fill and uses a stronger variant-coloured border, and `plain` removes both.

<ComponentPreview src="./examples/alert-appearances.preview.vue.ts" />

## Sizes

Use the default size for ordinary control-panel feedback. `sm` fits compact settings rows and secondary feedback, while `lg` gives an important alert more visual weight. The size scales the icon, type, padding, dismissal, details, copy controls, and default-sized action buttons together.

<ComponentPreview src="./examples/alert-sizes.preview.vue.ts" />

## Details and Copying

Put secondary or technical information in the `details` slot so the primary message stays concise. Set `copyable` when the details need to be shared or retained elsewhere. The component adds a compact copy button with a subdued neutral colour inside the details area and copies the slot's plain text. Its icon changes to a check after success, the result is announced, and failures remain visibly explained.

Content in the `actions` slot belongs to the consumer. The alert scales default-sized Plugin Kit buttons with its `size`, but the button's own variant continues to control its appearance.

Use `announce="polite"` for asynchronous updates that can wait and `announce="assertive"` only for an urgent failure that interrupts the current task. Static alerts should keep the default `announce="off"` value.

<ComponentPreview src="./examples/alert-details.preview.vue.ts" />

### Scrolling Details

Large diagnostic output scrolls once it reaches the details area's maximum height. The copy control remains inset within the scrolling content, so a native scrollbar only affects its alignment when one is present.

<ComponentPreview src="./examples/alert-scrolling-details.preview.vue.ts" />

## Icons and Dismissal

Each variant supplies an icon. Set `hide-icon` when the message doesn't need one, or provide an `icon` slot for a product-specific symbol.

<ComponentPreview src="./examples/alert-icons.preview.vue.ts" />

Set `dismissible` only when hiding the alert won't conceal a condition that still blocks the task. The `pk-dismiss` event is cancelable, and the alert hides itself unless the event is prevented.

<ComponentPreview src="./examples/alert-dismissible.preview.vue.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `title` | Alert heading. Takes precedence over the `heading` property. |
| `icon` | Custom icon. The component supplies a variant icon by default. |
| `(default)` | Alert message or other primary content. |
| `actions` | Optional primary alert actions. |
| `details` | Optional content inside the collapsible details region. |

### Props

| Name | Description |
| --- | --- |
| `announce` | <small><strong>Type</strong> <code>PkAlertAnnouncement</code></small><br><small><strong>Default</strong> <code>off</code></small> |
| `appearance` | Visual treatment, independent from the alert's semantic variant.<br><small><strong>Type</strong> <code>PkAlertAppearance</code></small><br><small><strong>Default</strong> <code>accent</code></small> |
| `copiedLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Details copied.</code></small> |
| `copyable` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `copyErrorLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Copy failed. Select the details and copy them manually.</code></small> |
| `copyLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Copy details</code></small> |
| `detailsLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Details</code></small> |
| `detailsOpen` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `dismissible` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `dismissLabel` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Dismiss</code></small> |
| `heading` | <small><strong>Type</strong> <code>string</code></small> |
| `hideIcon` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | Overall density, including typography, icons, spacing, details, and actions.<br><small><strong>Type</strong> <code>PkAlertSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `variant` | <small><strong>Type</strong> <code>PkAlertVariant</code></small><br><small><strong>Default</strong> <code>info</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `copyDetails()` | Copy the plain text assigned to the details slot. |
| `dismiss()` | Request dismissal and hide the alert unless the event is prevented. |
| `show()` | Show an alert hidden by `dismiss()`. |

### Events

| Name | Description |
| --- | --- |
| `@pk-copy` | Emitted when the details are copied successfully. |
| `@pk-copy-error` | Emitted when the details cannot be copied. |
| `@pk-dismiss` | Emitted before a dismissible alert hides. Prevent to keep it visible. |

### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-alert-accent` | Accent, title and icon colour. |
| `--pk-alert-background` | Alert background. |
| `--pk-alert-body-color` | Primary content colour. |
| `--pk-alert-border` | Alert and divider border colour. |
| `--pk-alert-color` | Alert host colour. |
| `--pk-alert-details-max-height` | Maximum height of diagnostic details. |
| `--pk-alert-padding` | Alert inner padding. |
| `--pk-alert-radius` | Alert corner radius. |
| `--pk-alert-title-color` | Heading colour. |
| `--pk-alert-title-size` | Heading font size. |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `actions` | Alert actions wrapper. | `::part(actions)` |
| `base` | Alert container. | `::part(base)` |
| `body` | Default content wrapper. | `::part(body)` |
| `content` | Heading and message wrapper. | `::part(content)` |
| `copy-button` | Copy-details button. | `::part(copy-button)` |
| `copy-status` | Copy result status. | `::part(copy-status)` |
| `details` | Collapsible details element. | `::part(details)` |
| `details-content` | Details content wrapper. | `::part(details-content)` |
| `details-summary` | Details disclosure label. | `::part(details-summary)` |
| `dismiss-button` | Dismiss button. | `::part(dismiss-button)` |
| `icon` | Icon wrapper. | `::part(icon)` |
| `notice` | Icon, content and dismiss-button row. | `::part(notice)` |
| `title` | Alert heading. | `::part(title)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-copy-button` | Compact copy-details action. |

<!-- pk-api:end -->
