# Button

Buttons trigger actions, confirm intent, and surface secondary options.

## Variants

Use `primary` for the main action and `secondary` for supporting actions. `default`, `outline`, `dashed`, `transparent`, `link`, and `none` cover quieter or borderless treatments.

<ComponentPreview src="./examples/button-variants.preview.web.ts" />

## Sizes

The size scale is shared across text buttons, icon buttons, and icon-plus-label buttons so controls can stay visually aligned in dense CP interfaces.

<ComponentPreview src="./examples/button-sizes.preview.web.ts" />

## Icons

Slot icons with `<pk-icon slot="start">` / `slot="end"` — prepend, append, both, or icon-only. Let `pk-button` own glyph size via `--pk-btn-icon-size`; do not size the icon yourself.

<ComponentPreview src="./examples/button-icons.preview.web.ts" />

## Icon-Only Sizes

Icon-only buttons (no label) are **square** by default — hit box matches the size height — so they align in table action rows. Add the boolean `icon` attribute when you want a padless control that hugs the glyph (dense × / ⋯). `group-trigger` stays a narrow disclosure end-cap either way.

<ComponentPreview src="./examples/button-icon-only-sizes.preview.web.ts" />

## Loading

Loading buttons should preserve their footprint and communicate progress without shifting nearby controls.

<ComponentPreview src="./examples/button-loading.preview.web.ts" />

## Disabled and Links

Use disabled buttons for unavailable actions, and the link variant when the action navigates.

<ComponentPreview src="./examples/button-disabled-link.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Button label |
| `start` | Leading icon or prefix |
| `end` | Trailing icon or suffix |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `ariaLabel` `aria-label` | Accessible name — wins over title when both are set.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `disabled` | Disables the control and blocks activation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `form` | HTML form owner id — same as native `<button form="…">`. Needed when the submit control lives outside the `<form>` (e.g. dialog footer).<br><small><strong>Type</strong> <code>string \| undefined</code></small> |
| `groupTrigger` `group-trigger` | Compact chevron-only trigger for grouped split actions — Craft `.menubtn`. Not a variant or size: set this boolean on the disclosure end-cap in a split group. Hides label/icons and draws a CSS `::after` chevron (0.4375rem, 2px borders). Inherits `variant`/`size` from sibling buttons; inline padding narrows to 8px. Do not pass a chevron icon — use `icon` + a start-slot icon for a padless square control.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `href` | When set, renders as an anchor instead of a button.<br><small><strong>Type</strong> <code>string \| undefined</code></small> |
| `icon` | Compact icon density: padless box that hugs the glyph (no square hit target). Prefer default icon-only usage for action rows — without this flag, icon-only buttons are square (`width`/`height` = size height) with the glyph from `--pk-btn-icon-size`. Use `icon` for dense × / ⋯ in cells. For one-off dimensions use `size="none"` and set `--pk-btn-*` on the host.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `loading` | Shows an inline spinner and prevents activation while busy.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `name` | Native `name` when used as a submit/reset control.<br><small><strong>Type</strong> <code>string \| undefined</code></small> |
| `rel` | Anchor `rel` when `href` is set.<br><small><strong>Type</strong> <code>string \| undefined</code></small> |
| `size` | Shared CP size scale (`xxs` … `xl`); `none` skips presets for host token overrides.<br><small><strong>Type</strong> <code>PkButtonSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `spinnerSize` `spinner-size` | Override loading spinner size. When unset, derived from `size` via `getButtonSpinnerSize` — same defaults as v1 Button (xxs/xs → xxs, lg/xl → sm, else xs). Formie New Form passes `xs` on `size="lg"` so the ring stays size-4 (1rem), not sm (1.5rem).<br><small><strong>Type</strong> <code>PkSpinnerSize \| undefined</code></small> |
| `spinnerTone` `spinner-tone` | Loading spinner tone. Defaults from the button variant when unset.<br><small><strong>Type</strong> <code>PkSpinnerTone \| undefined</code></small> |
| `spinnerVariant` `spinner-variant` | Loading spinner visual style. Defaults from the button variant when unset.<br><small><strong>Type</strong> <code>PkSpinnerVariant \| undefined</code></small> |
| `target` | Anchor `target` when `href` is set.<br><small><strong>Type</strong> <code>string \| undefined</code></small> |
| `title` | Accessible name for icon-only / unlabeled controls. Applied as `aria-label` — never as HTML `title` (no native hover tooltip). Prefer the `aria-label` attribute when setting from markup; `title` remains as a concise alias for the same accessible name.<br><small><strong>Type</strong> <code>string</code></small> |
| `type` | Native button type — ignored when `href` is set.<br><small><strong>Type</strong> <code>'button' \| 'submit' \| 'reset'</code></small><br><small><strong>Default</strong> <code>button</code></small> |
| `value` | Native `value` when used as a submit control.<br><small><strong>Type</strong> <code>string \| undefined</code></small> |
| `variant` | Visual treatment — filled, outline, link, etc.<br><small><strong>Type</strong> <code>PkButtonVariant</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `withCaret` `with-caret` | Shows a disclosure caret after the label.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-btn-caret-size` | Built-in caret glyph size.<br><small><strong>Default</strong> <code>var(--pk-btn-caret-size-default)</code></small> |
| `--pk-btn-fill` | Background fill (filled variants). |
| `--pk-btn-fill-active` | Active / pressed fill. |
| `--pk-btn-fill-hover` | Hover fill. |
| `--pk-btn-font` | Label font size.<br><small><strong>Default</strong> <code>var(--pk-btn-font-default)</code></small> |
| `--pk-btn-height` | Control height (also min-height).<br><small><strong>Default</strong> <code>var(--pk-btn-height-default)</code></small> |
| `--pk-btn-icon-gap` | Gap between icons and label.<br><small><strong>Default</strong> <code>var(--pk-btn-icon-gap-default)</code></small> |
| `--pk-btn-icon-size` | Start/end slot glyph size.<br><small><strong>Default</strong> <code>var(--pk-btn-icon-size-default)</code></small> |
| `--pk-btn-on` | Foreground color on filled variants. |
| `--pk-btn-padding-block` | Vertical padding override.<br><small><strong>Default</strong> <code>0</code></small> |
| `--pk-btn-padding-inline` | Horizontal padding.<br><small><strong>Default</strong> <code>var(--pk-btn-padding-inline-default)</code></small> |
| `--pk-btn-radius` | Border radius.<br><small><strong>Default</strong> <code>var(--pk-btn-radius-default)</code></small> |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | The native button / link element | `::part(base)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-spinner` | Loading indicator rendered while `loading` is set. |

<!-- pk-api:end -->
