# Styling APIs

Import the distributed stylesheet from:

```ts
import '@verbb/plugin-kit-react/style.css';
```

## Distributed CSS

The supported consumer entry is the package export:

```
@verbb/plugin-kit-react/style.css
```

There is **no** TypeScript “styling API” beyond importing this file (and your own Tailwind layers).

## Build-time (package maintainers)

The library is built with Vite, Tailwind 4, and optionally **`vite-plugin-tailwind-shadowdom`** for shadow-friendly output. Consumer plugins do not invoke these plugins through a public API—consume **`style.css`** instead.

## Portal-related styling

`configurePluginKitReact({ portalClassName })` sets a class on portaled subtrees so you can target overlays in CSS:

```ts
import { configurePluginKitReact } from '@verbb/plugin-kit-react/utils';

configurePluginKitReact({ portalClassName: 'my-plugin-ui' });
```

Combine with **`portalContainer`** when using Shadow DOM so those rules apply inside the shadow tree.

## Shadow DOM note

If your app renders inside a shadow root, import or inject the package CSS into that same shadow root. Importing the stylesheet only at the document level will not style content rendered inside shadow DOM.

## Tokens and CP variables

Craft CP exposes its own CSS variables. This package does not export JS accessors for CP theme tokens; align colors/spacing in your app’s Tailwind theme or CSS layers.

## Related

- [CSS setup](../getting-started/css-setup.md)
- [React App APIs](./react-app-apis.md)
