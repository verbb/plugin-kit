# Icon

`Icon` renders Plugin Kit’s raw SVG set — no icon font. Size follows `font-size`; fill follows `currentColor`. Prefer the `icon` prop over `name` in Craft forms (namespaced `name` props get rewritten).

## Register the icons you use

`<Icon icon="…">` looks up glyphs by **kebab-case** name. The registry starts **empty** so production CP bundles only pay for icons you register. Import the element, then register named (camelCase) exports — keys normalize to kebab automatically:

```ts
import '@verbb/plugin-kit-web/components/icon.js';
import { registerIcons, plus, gear, ellipsis } from '@verbb/plugin-kit-icons';

registerIcons({ plus, gear, ellipsis });
// → <Icon icon="plus"> / icon="gear" / icon="ellipsis"
```

Need every curated glyph (docs, workshops, prototypes)?

```ts
import '@verbb/plugin-kit-icons/all.js';
```

The no-build loader and `registerAll()` already load the full set.

## Gallery

Every icon in the bundled set. Click a tile to copy its `<Icon>` tag.

<ComponentPreview src="./examples/icon-gallery.preview.vue.ts" />

## Common Icons

A handful of icons most plugins reach for.

<ComponentPreview src="./examples/icon-common.preview.vue.ts" />

## Sizing

Scale icons with `font-size` on the host (defaults to `1em`).

<ComponentPreview src="./examples/icon-sizing.preview.vue.ts" />

## Color

Tint via CSS `color` — icons use `currentColor`.

<ComponentPreview src="./examples/icon-color.preview.vue.ts" />

## Accessibility

Icons are decorative by default (hidden from assistive technology). Set `label` when the icon alone conveys meaning.

<ComponentPreview src="./examples/icon-accessibility.preview.vue.ts" />

## In Context

Slot into other components — buttons stay icon-agnostic via `slot="start"` / `slot="end"`.

<ComponentPreview src="./examples/icon-in-context.preview.vue.ts" />
