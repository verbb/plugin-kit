# `@verbb/plugin-kit-web`

Canonical Craft CP UI as Lit custom elements (`<pk-*>`) — shadow DOM, `--pk-*` tokens, and accessibility live here. React and Vue adapters are thin facades over this package.

## Install

```bash
npm install @verbb/plugin-kit-web
```

Node `>= 20`. Peer / runtime packages (`lit`, `@floating-ui/dom`, `@verbb/plugin-kit-core`, `@verbb/plugin-kit-icons`, and TipTap/CodeMirror cores when you import those families) install with the package on a normal npm publish.

Full Craft wiring (Vite + asset bundle + Twig) is in the [Web quick start](https://docs.verbb.io/plugin-kit/web/getting-started/quick-start).

## Consume (bundler)

Prefer **family side-effect imports** so TipTap, CodeMirror, and other heavy surfaces stay out of the graph until you ask for them:

```ts
import '@verbb/plugin-kit-web/plugin-kit.css'; // tokens + FOUCE + overlay chrome

import '@verbb/plugin-kit-web/components/button.js';
import '@verbb/plugin-kit-web/components/dropdown-menu.js';
import '@verbb/plugin-kit-web/components/icon.js';

// Only the glyphs your `<pk-icon icon="…">` tags need
import { registerIcons, plus, gear } from '@verbb/plugin-kit-icons';
registerIcons({ plus, gear });
```

```html
<pk-button variant="primary">Save</pk-button>

<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>Actions</pk-button>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-item value="delete">Delete</pk-dropdown-item>
</pk-dropdown-menu>
```

Family entries live at `@verbb/plugin-kit-web/components/{family}.js` (for example `dropdown-menu.js` registers menu, item, separator, and label). TipTap is split (`tiptap-editor` / `tiptap-input` / `tiptap-content`).

Need a typed class?

```ts
import { PkButton } from '@verbb/plugin-kit-web/components/button/pk-button.js';
```

Avoid the package root (`@verbb/plugin-kit-web`) and `@verbb/plugin-kit-web/register` in production CP bundles unless you intentionally want the full library (playgrounds, demos).

### Icons

`<pk-icon icon="…">` uses an **opt-in** registry. Register named glyphs, or import `@verbb/plugin-kit-icons/all.js` for the full curated set. HTML uses kebab-case (`icon="arrow-up"`); JS exports are camelCase (`arrowUp`) and normalize on register.

### Waiting before JS interaction

FOUCE CSS handles **visual** readiness. When your entry reads properties, focuses elements, or attaches listeners on first load:

```ts
import { allDefined } from '@verbb/plugin-kit-web/plugin-kit';

await allDefined();
// or: await allDefined({ root: document.getElementById('my-field') });

const button = document.querySelector('pk-button');
await button?.updateComplete;
```

- **`allDefined()`** — page-level or scoped (`root`) gate before querying `pk-*`
- **`customElements.whenDefined('pk-button')`** — when you only need one tag
- **`element.updateComplete`** — after define, before reading reflected attrs / Lit properties

## Styles

| Import | Purpose |
|--------|---------|
| `@verbb/plugin-kit-web/plugin-kit.css` | **Recommended** — tokens + FOUCE + overlay chrome |
| `@verbb/plugin-kit-web/tokens.css` | Design tokens on `:root` only |
| `@verbb/plugin-kit-web/utilities/fouce.css` | FOUCE alone (already included in `plugin-kit.css`) |

Shadow roots reset `box-sizing` via `PkElement`. Load `plugin-kit.css` so it can land in `<head>` before first paint — do not rely on JS alone to hide undefined elements.

### FOUCE (short)

`plugin-kit.css` hides `pk-*` until they upgrade (reserve in-flow controls; collapse overlays). Optional `.pk-cloak` on `<html>` or a wrapper hides a broader region until all `pk-*` descendants upgrade. A 2s safety reveal prevents a failed import from blanking the UI forever.

Turbo / Hotwire CP pages:

```ts
import { preventTurboFouce } from '@verbb/plugin-kit-web/plugin-kit';
preventTurboFouce();
```

Details and the FOUCE lab: [Reducing FOUCE](https://docs.verbb.io/plugin-kit/web/getting-started/fouce).

## No-build (script tag)

Host `dist-loader/` and load CSS + the loader — it discovers `pk-*` on the page and lazy-loads only what you use:

```html
<link rel="stylesheet" href="/path/to/dist-loader/plugin-kit.css" />
<script type="module" src="/path/to/dist-loader/plugin-kit.loader.js"></script>

<pk-button variant="primary">Save</pk-button>
```

Base path is taken from the script URL. Override with `data-plugin-kit` or `setBasePath()`:

```html
<meta data-plugin-kit="/path/to/dist-loader" />
```

```html
<div data-pk-preload="pk-dialog pk-select"></div>
```

See [No-Build Step](https://docs.verbb.io/plugin-kit/web/getting-started/no-build-step).

## Craft CP tips

1. Import `plugin-kit.css` from the same entry Craft publishes so FOUCE is render-blocking.
2. Cherry-pick family imports for the tags your Twig/JS actually uses.
3. If you split a “register” entry from an “app” entry, register **before** the app mounts (manifest / asset order).
4. Twig can render `<pk-*>` markup directly; components upgrade in place once the entry runs.

## Framework adapters

Same elements, framework-shaped imports:

| Package | Bootstrap |
|---------|-----------|
| [`@verbb/plugin-kit-react`](../plugin-kit-react/README.md) | `createRoot` + `PluginKitProvider` |
| [`@verbb/plugin-kit-vue`](../plugin-kit-vue/README.md) | `createApp` + `PluginKitProvider` |

## Related packages

| Package | Role |
|---------|------|
| `@verbb/plugin-kit-icons` | Opt-in glyph registry for `<pk-icon>` |
| `@verbb/plugin-kit-forms` | Headless SchemaForm engine |
| `@verbb/plugin-kit-tiptap-core` | Shared TipTap schema / serialization |
| `@verbb/plugin-kit-codemirror-core` | Shared CodeMirror setup |
| `@verbb/plugin-kit-core` | Host bridge helpers, shared utils |

## Docs & workshop

- Docs: [docs.verbb.io/plugin-kit/web](https://docs.verbb.io/plugin-kit/web/)
- Component workshop (monorepo): `npm run dev` → http://localhost:5175  
  FOUCE lab: `/tools/fouce`
