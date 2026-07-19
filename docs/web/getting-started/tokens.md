# Tokens & CSS

Plugin Kit styling is driven by **design tokens** from `@verbb/plugin-kit-web`. Custom elements use shadow DOM; tokens pierce into each shadow root via CSS custom properties (`--pk-*`).

## Load tokens

Recommended — aggregate stylesheet (tokens + FOUCE):

```ts
import '@verbb/plugin-kit-web/plugin-kit.css';
```

Tokens only:

```ts
import '@verbb/plugin-kit-web/tokens.css';
```

Or link the built file from `node_modules/@verbb/plugin-kit-web/dist/tokens.css` / `plugin-kit.css`.

## Shadow DOM

Components encapsulate their own styles. You generally **do not** need Tailwind or utility classes to style `<pk-*>` internals.

Override appearance via:

- Component attributes (`variant`, `size`, …)
- `--pk-*` variables on a host or ancestor (where documented)
- Craft CP context classes on slotted light-DOM content only

## React / Vue note

Adapters ship a convenience stylesheet (`@verbb/plugin-kit-react/style.css` / `@verbb/plugin-kit-vue/style.css`) that loads tokens, FOUCE, and overlay chrome. You can also import `@verbb/plugin-kit-web/plugin-kit.css` (or the individual sheets) yourself — importing a facade registers its custom element.

## FOUCE

Load `styles/utilities/fouce.css` (or `plugin-kit.css`) with tokens so undefined `<pk-*>` elements do not flash before they upgrade. See [Reducing FOUCE](./fouce).
