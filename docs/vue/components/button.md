# Button

Buttons trigger actions, confirm intent, and surface secondary options.

## Variants

Use `primary` for the main action and `secondary` for supporting actions. `default`, `outline`, `dashed`, `transparent`, `link`, and `none` cover quieter or borderless treatments.

<ComponentPreview src="./examples/button-variants.preview.vue.ts" />

## Sizes

The size scale is shared across text buttons, icon buttons, and icon-plus-label buttons so controls can stay visually aligned in dense CP interfaces.

<ComponentPreview src="./examples/button-sizes.preview.vue.ts" />

## Icons

Slot icons with `<Icon slot="start">` / `slot="end"` — prepend, append, both, or icon-only. Let `Button` own glyph size via `--pk-btn-icon-size`; do not size the icon yourself.

<ComponentPreview src="./examples/button-icons.preview.vue.ts" />

## Icon-Only Sizes

Icon-only buttons (no label) are **square** by default — hit box matches the size height — so they align in table action rows. Add the boolean `icon` prop when you want a padless control that hugs the glyph (dense × / ⋯). `groupTrigger` stays a narrow disclosure end-cap either way.

<ComponentPreview src="./examples/button-icon-only-sizes.preview.vue.ts" />

## Loading

Loading buttons should preserve their footprint and communicate progress without shifting nearby controls.

<ComponentPreview src="./examples/button-loading.preview.vue.ts" />

## Disabled and Links

Use disabled buttons for unavailable actions, and the link variant when the action navigates.

<ComponentPreview src="./examples/button-disabled-link.preview.vue.ts" />
