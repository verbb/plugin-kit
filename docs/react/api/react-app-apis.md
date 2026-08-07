# React app APIs

```ts
import {
  PluginKitProvider,
  mountShadowApp,
  configurePluginKitReact,
  createCraftHostBridge,
} from '@verbb/plugin-kit-react/utils';
```

## `PluginKitProvider`

Wraps the React tree and applies Plugin Kit config (translation, shadow/scroll-lock settings, optional host bridge).

```tsx
import { createRoot } from 'react-dom/client';
import { PluginKitProvider } from '@verbb/plugin-kit-react';

createRoot(el).render(
  <PluginKitProvider translationCategory="my-plugin">
    <App />
  </PluginKitProvider>,
);
```

| Prop | Default | Role |
|------|---------|------|
| `translationCategory` | — | Category for `useTranslation` / form engine messages |
| `translate` | `Craft.t` when present | Custom translator |
| `hostBridge` | — | Opt-in Craft action/selector bridge |
| `portalContainer` | — | ShadowRoot from `mountShadowApp`; enables document scroll-gutter stability for overlay scroll lock in embedded hosts |
| `shadowRootSelectors` | `['[data-plugin-kit-shadow-root]']` | Selectors used for overlay scroll-lock scoping inside shadow roots |

Overlays (dialogs, popovers, selects) render through the native **Popover API top layer** — no DOM reparenting, so no portal target is needed for positioning. `portalClassName` from v1 is deprecated and ignored.

Importing components registers their custom elements — no registration prop.

**`usePluginKitConfig()`** reads the nearest provider config (empty object when absent).

## `mountShadowApp`

Attaches an open shadow root, injects CSS text, and returns a mount node for `createRoot`.

```ts
import { mountShadowApp } from '@verbb/plugin-kit-react/utils';

const { mountNode, portalContainer } = mountShadowApp({
  element: '#root',            // selector or HTMLElement
  styles: [pluginKitStyles, screenStyles],
  // styleAttr?: string        // default 'data-pk-shadow-style'
  // rootAttr?: string         // default 'data-pk-shadow-root'
});
```

Pass `portalContainer` to `PluginKitProvider` so overlay scroll lock stays stable inside the shadow tree.

## `configurePluginKitReact` / `configure`

Same options as the Provider, for chrome slots or reconfigure-without-remount. Prefer the Provider for the main tree.

## `createCraftHostBridge`

```ts
import { createCraftHostBridge } from '@verbb/plugin-kit-react/utils';

hostBridge: createCraftHostBridge()
```

Wires `hostRequest`, `hostOpenElementSelector`, and related helpers to `window.Craft`. Only needed when those helpers are used.

## App error boundary

Import from **`@verbb/plugin-kit-react/utils`**.

| Export | Purpose |
| --- | --- |
| `AppErrorBoundary` | Class boundary that catches React render/lifecycle errors and paints a fallback. |
| `LargeErrorState` | Error `StatePanel` + optional stack details. |
| `StatePanel` | Centered empty / error / success / info surface. |

```tsx
import { AppErrorBoundary } from '@verbb/plugin-kit-react/utils';

<AppErrorBoundary
  consoleLabel="My builder crashed:"
  title={Craft.t('my-plugin', 'Something went wrong')}
  message={Craft.t('my-plugin', 'The builder failed to load. Please refresh the page or try again.')}
  detailsLabel={Craft.t('my-plugin', 'Show error details')}
  reloadLabel={Craft.t('my-plugin', 'Reload')}
>
  <App />
</AppErrorBoundary>
```

Register icons the fallback uses (at least `triangle-exclamation` for the error variant).
