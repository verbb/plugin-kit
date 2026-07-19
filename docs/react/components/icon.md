# Icon

`Icon` renders Plugin Kit’s raw SVG set — no icon font. Size follows `font-size`; fill follows `currentColor`. Prefer the `icon` prop over `name` in Craft forms (namespaced `name` attributes get rewritten).

## Register the icons you use

`<Icon icon="…">` looks up glyphs by **kebab-case** name. The registry starts **empty** so production CP bundles only pay for icons you register. Import the facade, then register named (camelCase) exports — keys normalize to kebab automatically:

```ts
import { Icon } from '@verbb/plugin-kit-react/components';
import { registerIcons, plus, gear, ellipsis } from '@verbb/plugin-kit-icons';

registerIcons({ plus, gear, ellipsis });
// → <Icon icon="plus" /> / icon="gear" / icon="ellipsis"
```

Need every curated glyph (docs, workshops, prototypes)?

```ts
import '@verbb/plugin-kit-icons/all.js';
```

The no-build loader and `registerAll()` already load the full set.

## Gallery

Every icon in the bundled set. Click a tile to copy its `<Icon>` tag.

<ComponentPreview src="./examples/icon-gallery.preview.tsx" />

## Common Icons

A handful of icons most plugins reach for.

<ComponentPreview src="./examples/icon-common.preview.tsx" />

## Sizing

Scale icons with `font-size` on the host (defaults to `1em`).

<ComponentPreview src="./examples/icon-sizing.preview.tsx" />

## Color

Tint via CSS `color` — icons use `currentColor`.

<ComponentPreview src="./examples/icon-color.preview.tsx" />

## Accessibility

Icons are decorative by default (hidden from assistive technology). Set `label` when the icon alone conveys meaning.

<ComponentPreview src="./examples/icon-accessibility.preview.tsx" />

## In Context

Slot into other components — buttons stay icon-agnostic via `slot="start"` / `slot="end"`.

<ComponentPreview src="./examples/icon-in-context.preview.tsx" />
