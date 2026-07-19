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

## Fault handling

Import from **`@verbb/plugin-kit-react/fault`**.

| Export | Purpose |
| --- | --- |
| `AppFaultProvider`, `useAppFault`, `useAppFaultOptional` | App-level fault state (record, reset). |
| `AppFaultBoundary` | Error boundary that reports into the fault provider. |
| `FaultFallback`, `ResetUiButton` | Default fallback UI pieces. |
| `useUiWatchdog` | Detects a hung/blank UI and raises a fault. |
| `buildSupportBundle` | Collects diagnostics for support reports. |
| `isIgnorableGlobalError` | Filter for benign global errors (e.g. `ResizeObserver` noise). |

```tsx
import { AppFaultProvider, AppFaultBoundary } from '@verbb/plugin-kit-react/fault';

<AppFaultProvider>
  <AppFaultBoundary>
    <App />
  </AppFaultBoundary>
</AppFaultProvider>
```
