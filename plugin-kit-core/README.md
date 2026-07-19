# `@verbb/plugin-kit-core`

Shared utilities and Craft CP host integration for Plugin Kit. Framework adapters and `@verbb/plugin-kit-web` depend on this package; most apps get it transitively.

## Install

```bash
npm install @verbb/plugin-kit-core
```

## What you get

| Area | Examples |
|------|----------|
| Host bridge | `setHostBridge`, `getHostBridge`, Craft request / selector helpers |
| Portal helpers | `setPortalContainer`, `getPortalMountNode`, … |
| Utils | string/handle helpers, markdown, query, collections, promises |
| Tooling | `@verbb/plugin-kit-core/eslint/*`, `@verbb/plugin-kit-core/prettier/*` |

## Host bridge

Prefer the adapter helpers when you use React/Vue:

```ts
import { createCraftHostBridge, PluginKitProvider } from '@verbb/plugin-kit-react/utils';
// or from '@verbb/plugin-kit-vue/utils' / '/app'

<PluginKitProvider hostBridge={createCraftHostBridge()} … />
```

Low-level (vanilla / custom bootstrap):

```ts
import { setHostBridge } from '@verbb/plugin-kit-core';

setHostBridge({
  request: (method, action, config) => Craft.sendActionRequest(method, action, config),
  // …
});
```

Skip the bridge when the screen only uses UI primitives.

## Docs

Shared concepts live under the Web / React / Vue guides on [docs.verbb.io/plugin-kit](https://docs.verbb.io/plugin-kit/).
