# Styling APIs

Import the distributed stylesheet from:

```ts
import '@verbb/plugin-kit-react/style.css';
```

## Distributed CSS

| Export | Purpose |
| --- | --- |
| `@verbb/plugin-kit-react/style.css` | Main bundle: PK tokens, FOUCE cloak, overlay light-DOM chrome (dialog header/close), FieldWrap layout rules. |
| `@verbb/plugin-kit-react/tailwind-theme.css` | Tailwind v4 `@theme` bridge — maps utility colors (`bg-gray-50`, …) onto PK tokens. Import only when your app also uses `@import "tailwindcss"`. |
| `@verbb/plugin-kit-react/tailwind-preflight-scope.css` | Documentation/no-op target for the Tailwind-preflight-beside-kit host contract (preflight `* { margin: 0 }` beats shadow `:host` margins). |

There is **no** TypeScript “styling API” beyond importing these files (and your own Tailwind layers).

## Build-time (package maintainers)

The library is built with Vite; components style themselves inside their shadow roots via the web-component layer. Consumer plugins do not invoke build plugins through a public API — consume the CSS exports instead.

For local monorepo dev, `@verbb/plugin-kit-react/vite-dev` exports `getPluginKitReactViteDevAliases()` so apps can compile the package from `src/` with HMR. Production builds resolve `exports` → `dist/`.

## Shadow DOM note

If your app renders inside a shadow root, inject the package CSS into that same shadow root (see [`mountShadowApp`](./react-app-apis.md#mountshadowapp) — pass the CSS as `styles`). Importing the stylesheet only at the document level will not style content rendered inside shadow DOM. Keep a document-level `style.css` import too, so FOUCE cloaking hides unupgraded tags before the shadow tree mounts.

Overlays render through the native Popover API top layer; there is no portal class hook for styling them (`portalClassName` is deprecated and ignored). Style overlay content via component parts/tokens, or the light-DOM `.pk-dialog__*` chrome classes shipped in `style.css`.

## Tokens and CP variables

Craft CP exposes its own CSS variables. This package does not export JS accessors for CP theme tokens; align colors/spacing in your app’s Tailwind theme or CSS layers — `tailwind-theme.css` does this for the stock utility palette.

## Related

- [CSS setup](../getting-started/css-setup.md)
- [React App APIs](./react-app-apis.md)
