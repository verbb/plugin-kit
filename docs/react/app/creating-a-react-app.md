# Creating a React app

This page covers the frontend side of the setup from [Quick Start](../getting-started/quick-start.md).

## Canonical bootstrap

Use React’s `createRoot` plus `PluginKitProvider`. Importing a component from
`@verbb/plugin-kit-react/components` registers its underlying custom element — there is
no `registerAll` / `createReactApp` step.

```tsx
import '@verbb/plugin-kit-react/style.css';

import { createRoot } from 'react-dom/client';
import { PluginKitProvider } from '@verbb/plugin-kit-react';

import { App } from './App';

createRoot(document.querySelector('#my-plugin-root')!).render(
  <PluginKitProvider translationCategory="my-plugin">
    <App />
  </PluginKitProvider>,
);
```

`PluginKitProvider` applies shared config (translation category, optional shadow-root
scroll-lock settings, optional Craft host bridge) before children render.

## Shadow DOM

For Craft CP screens that need style isolation from Craft chrome, use `mountShadowApp`:

```tsx
import pluginKitStyles from '@verbb/plugin-kit-react/style.css?inline';
import screenStyles from './screen.css?inline';
import { createRoot } from 'react-dom/client';
import { mountShadowApp, PluginKitProvider } from '@verbb/plugin-kit-react/utils';

const { mountNode, portalContainer } = mountShadowApp({
  element: '#my-plugin-root',
  styles: [pluginKitStyles, screenStyles],
});

createRoot(mountNode).render(
  <PluginKitProvider
    translationCategory="my-plugin"
    portalContainer={portalContainer}
  >
    <App />
  </PluginKitProvider>,
);
```

Keep a document-level `@verbb/plugin-kit-react/style.css` (or `plugin-kit.css`) import for
FOUCE before first paint; inject tokens into the shadow root as above.

## Host bridge

A host bridge gives package utilities a stable way to call Craft (`hostRequest`, element
selector, locale helpers). It is **opt-in**:

```tsx
import { createCraftHostBridge, PluginKitProvider } from '@verbb/plugin-kit-react/utils';

<PluginKitProvider
  translationCategory="my-plugin"
  hostBridge={createCraftHostBridge()}
>
  <App />
</PluginKitProvider>
```

Skip it when the screen only uses UI primitives.

## `configurePluginKitReact()`

Same config as the Provider, for secondary mounts (e.g. Craft chrome slots) that need a
different `portalContainer` without wrapping another tree. Prefer the Provider for the
main app.

## Icons

```ts
import { registerIcons, plus, gear } from '@verbb/plugin-kit-icons';

registerIcons({ plus, gear });
```

Or `import '@verbb/plugin-kit-icons/all.js'` when you need the full curated set.
