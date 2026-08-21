# Icon

`pk-icon` renders Plugin Kit’s raw SVG set — no icon font. Size follows `font-size`; fill follows `currentColor`. Prefer the `icon` attribute over `name` in Craft forms (namespaced `name` attributes get rewritten).

## Register the icons you use

`<pk-icon icon="…">` looks up glyphs by **kebab-case** name. The registry starts **empty** so production CP bundles only pay for icons you register. Import the element, then register named (camelCase) exports — keys normalize to kebab automatically:

```ts
import '@verbb/plugin-kit-web/components/icon.js';
import { registerIcons, plus, gear, ellipsis, arrowsRotate } from '@verbb/plugin-kit-icons';

registerIcons({ plus, gear, ellipsis, arrowsRotate });
// → <pk-icon icon="plus"> / icon="gear" / icon="ellipsis" / icon="arrows-rotate"
```

Need every curated glyph (docs, workshops, prototypes)?

```ts
import '@verbb/plugin-kit-icons/all.js';
```

The no-build loader and `registerAll()` already load the full set.

## Gallery

Every built-in icon from `@verbb/plugin-kit-icons` — the canonical name list. Click a tile to copy its `<pk-icon>` tag. Generated from the package, so new glyphs appear here automatically. Prefer `arrows-rotate` for reload controls over `arrow-rotate-left` / `arrow-rotate-right`.

Paths are stored edge-cropped; at render time the viewBox expands to a centered square so every glyph fills the `1em` host evenly.

<ComponentPreview src="./examples/icon-gallery.preview.web.ts" />

## Common Icons

A handful of icons most plugins reach for — including `arrows-rotate`.

<ComponentPreview src="./examples/icon-common.preview.web.ts" />

## Sizing

Scale icons with `font-size` on the host (defaults to `1em`).

<ComponentPreview src="./examples/icon-sizing.preview.web.ts" />

## Alignment

`<pk-icon>` is a square `1em` host with `vertical-align: -0.125em` so inline icons sit with surrounding text. Scale with `font-size`; no extra sizing CSS is required.

Narrow glyphs (for example `ellipsis-vertical`) keep even side padding inside that square — intentional, so every icon shares the same box. Button start/end slots center icons in flex and turn off the baseline nudge.

<ComponentPreview src="./examples/icon-alignment.preview.web.ts" />

## Color

Tint via CSS `color` — icons use `currentColor`.

<ComponentPreview src="./examples/icon-color.preview.web.ts" />

## Accessibility

Icons are decorative by default (hidden from assistive technology). Set `label` when the icon alone conveys meaning.

<ComponentPreview src="./examples/icon-accessibility.preview.web.ts" />

## In Context

Slot into other components — buttons stay icon-agnostic via `slot="start"` / `slot="end"`.

<ComponentPreview src="./examples/icon-in-context.preview.web.ts" />
