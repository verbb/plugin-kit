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
