# Overview

`@verbb/plugin-kit-web` is for Craft plugin developers who want richer control panel interfaces without bringing React or Vue into the mix — or who want the canonical UI layer that those adapters sit on.

The main job of this package is to give you Craft-familiar custom elements (`<pk-*>`) you import as needed, style with shared tokens, and use from Twig, vanilla JS, or any host that speaks the DOM.

## What this package gives you

- Web components that feel at home in the Craft control panel
- Shadow DOM encapsulation with shared `--pk-*` design tokens
- Per-component registration imports for Craft asset bundles
- Building blocks for forms, overlays, menus, tables, rich text, and similar CP surfaces
- The same component contract that [React](/react/getting-started/overview) and [Vue](/vue/) adapters wrap

## Built with

These libraries power the shipped components (bundled as dependencies of `@verbb/plugin-kit-web`). You do not have to install them separately unless your plugin imports them directly alongside the kit.

- **[Lit](https://lit.dev/)** — custom element base and reactive rendering
- **[Floating UI](https://floating-ui.com/)** — positioning for popovers, menus, tooltips, and similar overlays
- **[TipTap](https://tiptap.dev/)** / **[ProseMirror](https://prosemirror.net/)** — rich text editing (`pk-tiptap-*` surfaces)

## What you will build in this guide

The getting started path assumes you are starting from a PHP-only plugin (or a plugin with a small JS entry) and want `<pk-*>` elements on a Craft CP page.

By the end of it, you should understand how to:

1. install `@verbb/plugin-kit-web` in your plugin frontend
2. load design tokens (and optional FOUCE utilities)
3. import the component modules you need in your CP entry file
4. publish the built files with a Craft asset bundle
5. use your first `<pk-*>` markup in a Twig template or JS-driven screen

## Where to read next

1. Read [Quick Start](./getting-started/quick-start) for the bundler + Craft asset bundle path.
2. Or [No-Build Step](./getting-started/no-build-step) if you want `<link>` / `<script type="module">` only.
3. Read [Tokens & CSS](./getting-started/tokens) once components are on the page and you want to understand styling and shadow DOM.
4. Read [Reducing FOUCE](./getting-started/fouce) so undefined custom elements do not flash before they upgrade.
5. Browse the [component reference](./components/button) for props, events, and slots on each `<pk-*>` element.
6. If you later adopt React or Vue for the same UI, switch to those adapter guides — they wrap these same elements.
