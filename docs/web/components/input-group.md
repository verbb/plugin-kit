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
