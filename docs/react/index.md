# Overview

`@verbb/plugin-kit-react` is for Craft plugin developers who want to build richer control panel interfaces with React.

The package provides **thin React facades** over `@verbb/plugin-kit-web` custom elements. Behavior and styles live in the web components; React maps props and events via `@lit/react`.

## What this package gives you

- React components that wrap `<pk-*>` web components (import = register)
- `PluginKitProvider` + `mountShadowApp` for Craft CP mounts
- Opt-in Craft host bridge helpers (`createCraftHostBridge`, `hostRequest`, …)
- SchemaForm engine built on `@verbb/plugin-kit-forms`
- Shadow DOM mounting with scoped overlay behavior

## What you will build in this guide

The getting started path assumes you are starting from a PHP-only plugin with no frontend build setup yet.

By the end of it, you should understand how to:

1. add a small frontend toolchain to your plugin
2. create a React entry file with `createRoot` + `PluginKitProvider`
3. register the built files as a Craft CP asset bundle
4. render a mount element in your template or CP page
5. mount your first `plugin-kit-react` UI inside the Craft control panel

## Where to read next

1. Read [Quick Start](./getting-started/quick-start) for the full PHP-plugin-to-first-React-screen setup.
2. Read [CSS setup](./getting-started/css-setup) once your app is mounting and you are ready to choose light DOM or Shadow DOM.
3. Read [Testing and debugging](./getting-started/testing-and-debugging) if your first integration is not behaving as expected.
4. Read [Creating a React app](./app/creating-a-react-app) when you want the frontend concepts explained in more detail, then use the React app reference pages as needed.
