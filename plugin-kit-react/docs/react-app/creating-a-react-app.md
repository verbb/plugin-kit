# Creating a React app

This page covers the frontend side of the setup from [Quick Start](../getting-started/quick-start.md).

If you are still trying to get your first screen mounted, start there first. This page does not repeat the full PHP/Twig/asset-bundle walkthrough. It focuses on what the frontend app actually is, why `plugin-kit-react` has a bootstrap step, and what your options are once you move beyond the first working example.

## Rendering with `createRoot()`

If all you want is to render plain React into a DOM node, then yes, you can just use `createRoot()` like a normal React app.

For example:

```tsx
const container = document.getElementById('my-plugin-root');

if (container) {
  createRoot(container).render(<App />);
}
```

That is valid React, and for very simple screens it may be enough.

The reason `plugin-kit-react` adds more setup is that it does more than just render components. Some parts of the package need shared application-level context such as:

- how translations should work
- how dialogs, popovers, and other portalled UI should be mounted
- how package utilities should talk to Craft's CP environment

That is where `configurePluginKitReact()` comes in.

## Using `configurePluginKitReact()`

`configurePluginKitReact()` is the package-level setup step, and it's geared towards an opinionated experience with the Craft control panel and plugins.

It tells `plugin-kit-react` how this particular app should behave. You can think of it as configuring the environment around your React tree, not rendering the tree itself.

At a high level, it can configure:

- a translation category or translation function
- a portal container for floating UI such as dialogs and popovers
- a host bridge so package utilities know how to call back into Craft

React itself does not know anything about those concerns. `createRoot()` only mounts your app. `configurePluginKitReact()` tells the package how to integrate with the page and host environment around it.

## Host bridge

A host bridge gives the package a stable way to ask Craft to do things such as:

- send a Craft action request
- open a Craft element selector modal
- format a date using Craft's locale-aware helpers
- read Craft-specific browser settings

Without that bridge, your React app is just a normal browser app. With that bridge, package utilities can safely talk to Craft in a consistent way.

Using the host bridge is optional. Add it when your app needs package features that depend on Craft, such as:

- package utilities that send requests through Craft
- package features that open Craft-native UI like element selectors
- other helpers that expect `window.Craft` behavior through the shared package API

The default bridge for Craft CP is `createCraftHostBridge()`.

## Example app initialization

Once your app needs package-level configuration, the entry file often looks something like this:

```tsx
import { createRoot } from 'react-dom/client';
import '@verbb/plugin-kit-react/style.css';

import { App } from './App';
import { configurePluginKitReact, createCraftHostBridge } from '@verbb/plugin-kit-react/utils';

configurePluginKitReact({
  hostBridge: createCraftHostBridge(),
  translationCategory: 'my-plugin',
});

const container = document.getElementById('my-plugin-root');

if (container) {
  createRoot(container).render(<App />);
}
```

Each part has a different job:

- `style.css` loads the package styles
- `configurePluginKitReact()` sets package-level behavior for this app
- `createCraftHostBridge()` connects package utilities to Craft's browser environment
- `createRoot()` mounts your app into the page

That does not mean every app must use every option. It just shows the common shape once your app starts using package features beyond basic rendering.

## Related pages

- [Quick Start](../getting-started/quick-start.md)
- [React App APIs](../api/react-app-apis.md)
