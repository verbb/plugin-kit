# Overview

`@verbb/plugin-kit-react` is for Craft plugin developers who want to build richer control panel interfaces with React instead of only Twig and server-rendered HTML.

The main job of this package is to help you get a React app running inside the Craft control panel without having to solve all the UI, styling, and host-integration pieces from scratch.

## What this package gives you

- React components that feel at home in the Craft control panel
- Helpers for connecting your React app to Craft concepts such as translations, dialogs, portals, and host APIs
- Styling support for both normal DOM rendering and Shadow DOM rendering
- Form-building tools for more advanced, Craft-like interfaces once your app is running

## Built with

These libraries are part of the shipped UI and form stack (bundled as dependencies of `@verbb/plugin-kit-react`). You do not have to install them separately unless your plugin imports them directly alongside the kit.

- **[Base UI](https://base-ui.com/react)** (`@base-ui/react`) — headless, accessible primitives for dialogs, menus, popovers, and similar patterns
- **[Tailwind CSS](https://tailwindcss.com/)** v4 — utility-first styling behind `@verbb/plugin-kit-react/style.css`, with helpers such as [`tailwind-merge`](https://github.com/dcastil/tailwind-merge), [`clsx`](https://github.com/lukeed/clsx), and [`class-variance-authority`](https://cva.style/docs)
- **[React](https://react.dev/)** 19 — peer dependency; the kit targets the same major as Craft’s CP React stack
- **[Zustand](https://github.com/pmndrs/zustand)** — SchemaForm engine state
- **[Valibot](https://valibot.dev/)** — schema validation for forms
- **[Jexl](https://github.com/TomFischer/jexl)** — condition expressions in schema-driven forms
- **[TipTap](https://tiptap.dev/)** / **[ProseMirror](https://prosemirror.net/)** — rich text editing (`TiptapEditor`, `TiptapInput`, and related schema fields)
- **[Framer Motion](https://motion.dev/)** — motion and layout transitions where components use it
- **[@dnd-kit](https://dndkit.dev/)** — drag-and-drop for sortable or builder-style surfaces
- **[cmdk](https://cmdk.paco.me/)** — command-palette style UI (for example variable picker flows)
- **[@tanstack/react-virtual](https://tanstack.com/virtual)** — virtualized lists in heavy menus or tables
- **[react-day-picker](https://react-day-picker.js.org/)** — calendar and date picking
- **[Font Awesome](https://fontawesome.com/)** — icons via `@fortawesome/react-fontawesome` and Pro icon sets bundled for kit components

## What you will build in this guide

The getting started path assumes you are starting from a PHP-only plugin with no frontend build setup yet.

By the end of it, you should understand how to:

1. add a small frontend toolchain to your plugin
2. create a React entry file
3. register the built files as a Craft CP asset bundle
4. render a mount element in your template or CP page
5. mount your first `plugin-kit-react` UI inside the Craft control panel

## Where to read next

1. Read [Quick Start](./quick-start.md) for the full PHP-plugin-to-first-React-screen setup.
2. Read [CSS setup](./css-setup.md) once your app is mounting and you are ready to choose light DOM or Shadow DOM.
3. Read [Testing and debugging](./testing-and-debugging.md) if your first integration is not behaving as expected.
4. Read [Creating a React app](../react-app/creating-a-react-app.md) when you want the frontend concepts explained in more detail, then use the React app reference pages as needed.
