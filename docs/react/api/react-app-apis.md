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

Same options as the Provider, for secondary interface slots or reconfigure-without-remount. Prefer the Provider for the main tree.

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
| `ErrorState` | Error adapter over the shared `StatePanel`, with optional stack details. |

When `message` is supplied, it remains the user-facing copy. Technical exception details stay collapsed and can be copied for support. Use `copyLabel`, `copiedLabel`, and `copyErrorLabel` to translate the copy control and its status messages.

Set `size="sm"` for a compact replacement state or `size="lg"` for a prominent content region. The size is passed through to the shared `StatePanel`, including its details, copy control, and action button.

```tsx
import { AppErrorBoundary } from '@verbb/plugin-kit-react/utils';

<AppErrorBoundary
  consoleLabel="My builder crashed:"
  heading={Craft.t('my-plugin', 'Something went wrong')}
  message={Craft.t('my-plugin', 'The builder failed to load. Please refresh the page or try again.')}
  detailsLabel={Craft.t('my-plugin', 'Show error details')}
  copyLabel={Craft.t('my-plugin', 'Copy error details')}
  copiedLabel={Craft.t('my-plugin', 'Error details copied.')}
  copyErrorLabel={Craft.t('my-plugin', 'Copy failed. Select the details and copy them manually.')}
  reloadLabel={Craft.t('my-plugin', 'Reload')}
>
  <App />
</AppErrorBoundary>
```

Use `ErrorState` directly when a request or content region fails without crashing its React tree. Import the general-purpose `StatePanel` from `@verbb/plugin-kit-react/components` for empty, informational, success, and warning states.

The fallback's semantic icon is built in; registry setup is only needed when supplying a custom named icon.
