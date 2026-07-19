# `@verbb/plugin-kit-icons`

Curated UI icons as **raw SVG path data** — no icon font, no Font Awesome runtime. Each glyph is `{ width, height, path }`, so bundlers only ship the icons you import.

Used by `@verbb/plugin-kit-web` (`<pk-icon>`) and the React/Vue `<Icon>` facades.

## Install

```bash
npm install @verbb/plugin-kit-icons
```

## Register for `<pk-icon>` / `<Icon>`

The name registry starts **empty** in bundler builds. Register the glyphs your markup looks up:

```ts
import '@verbb/plugin-kit-web/components/icon.js';
import { registerIcons, plus, gear, ellipsis } from '@verbb/plugin-kit-icons';

registerIcons({ plus, gear, ellipsis });
```

```html
<pk-icon icon="plus"></pk-icon>
<pk-icon icon="gear" label="Settings"></pk-icon>

<pk-button>
  <pk-icon icon="plus" slot="start"></pk-icon>
  Add
</pk-button>
```

Full curated set in one shot (larger bundle):

```ts
import '@verbb/plugin-kit-icons/all.js';
```

The no-build Plugin Kit loader already includes that full set.

### Sizing & colour

Icons follow `font-size` (default `1em`) and `currentColor`:

```html
<pk-icon icon="trash" style="font-size: 18px; color: #b91c1c"></pk-icon>
```

### Accessibility

Pass `label="…"` when the icon is meaningful on its own (image + title). Omit it for decorative icons — they are hidden from assistive tech.

## Use path data in JS

Tree-shakeable named exports — no registry required:

```ts
import { chevronDown, iconToSvg } from '@verbb/plugin-kit-icons';

element.innerHTML = iconToSvg(chevronDown);
element.innerHTML = iconToSvg(chevronDown, { title: 'Expand' });
```

Or register a name, then render `<pk-icon>`:

```ts
import { registerIcon, chevronDown } from '@verbb/plugin-kit-icons';

registerIcon('chevron-down', chevronDown);
element.innerHTML = `<pk-icon icon="chevron-down"></pk-icon>`;
```

## React / Vue

Facades resolve the same registry. Register glyphs (or import `all.js`) before the first string lookup:

```tsx
import { registerIcons, plus } from '@verbb/plugin-kit-icons';
import { Icon, Button } from '@verbb/plugin-kit-react/components';

registerIcons({ plus });

<Icon icon="plus" className="size-4" />
<Icon icon="plus" label="Add" />

<Button>
  <Icon slot="start" icon="plus" />
  Add
</Button>
```

```vue
<script setup>
import { registerIcons, plus } from '@verbb/plugin-kit-icons';
import { Icon, Button } from '@verbb/plugin-kit-vue/components';

registerIcons({ plus });
</script>

<template>
  <Button>
    <Icon slot="start" icon="plus" />
    Add
  </Button>
</template>
```

## Naming

| Context | Form | Example |
|---------|------|---------|
| HTML / `getIcon` | kebab-case | `chevron-down`, `arrow-up` |
| JS exports | camelCase | `chevronDown`, `arrowUp` |

`registerIcons({ arrowUp })` stores under `arrow-up` for HTML lookup.

```ts
import { getIcon, getIconNames } from '@verbb/plugin-kit-icons';

getIcon('gear');     // PkIcon | undefined (after register)
getIconNames();      // registered kebab-case names
```

## App-specific icons

Icons that should not join the shared set can still use the same lookup path:

```ts
import { registerIcon, registerIcons } from '@verbb/plugin-kit-icons';

registerIcon('sliders', {
  width: 512,
  height: 512,
  path: 'M32 64…',
});

registerIcons({
  'my-widget': { width: 512, height: 512, path: '…' },
});
```

Register **before** the first render that looks up those names.

## Licensing

Path data in this package was originally traced from Font Awesome. Font Awesome Free icons are typically CC BY 4.0; some glyphs may originate from Pro. Confirm licensing before redistributing or adding new paths to this package.
