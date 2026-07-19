# Overview

`@verbb/plugin-kit-vue` is for Craft plugin developers who want to build richer control panel interfaces with Vue 3.

The package provides **thin Vue facades** over `@verbb/plugin-kit-web` custom elements. Behavior and styles live in the web components; Vue maps props, attrs, and slots through the facade layer.

## What this package gives you

- Vue components that wrap `<pk-*>` web components (import = register)
- `PluginKitProvider` + `mountShadowApp` for Craft CP mounts
- Opt-in Craft host bridge helpers (`createCraftHostBridge`, `hostRequest`, …)
- Shadow DOM mounting with scoped overlay scroll-lock behavior

SchemaForm is available as `@verbb/plugin-kit-vue/forms` — same engine contract as React, Vue facades over the web components. See [Forms](/forms/).

## What you will build in this guide

The getting started path assumes you are starting from a PHP-only plugin with no frontend build setup yet.

By the end of it, you should understand how to:

1. add a small frontend toolchain to your plugin
2. create a Vue entry file with `createApp` + `PluginKitProvider`
3. register the built files as a Craft CP asset bundle
4. render a mount element in your template or CP page
5. mount your first `plugin-kit-vue` UI inside the Craft control panel

## Where to read next

1. Read [Quick Start](./quick-start.md) for the full PHP-plugin-to-first-Vue-screen setup.
2. Read [CSS setup](./css-setup.md) once your app is mounting and you are ready to choose light DOM or Shadow DOM.
3. Read [Testing and debugging](./testing-and-debugging.md) if your first integration is not behaving as expected.
4. Read [Creating a Vue app](../app/creating-a-vue-app.md) when you want the frontend concepts explained in more detail, then use the Vue API reference pages as needed.
