# Overview

Plugin Kit is [Verbb](https://verbb.io)'s design system for Craft CMS control panel interfaces. Use it when a CP screen outgrows Twig macros and one-off jQuery — complex forms, searchable pickers, rich text, conditionals, modals, builders, and similar. Small server-rendered settings pages do not need it.

`@verbb/plugin-kit-web` is the canonical UI: Craft-familiar custom elements (`<pk-*>`), shadow DOM, and `--pk-*` tokens. Import the components you need and use them from Twig, vanilla JS, or any host that speaks the DOM. [React](/react/) and [Vue](/vue/) are thin adapters over the same elements; [Forms](/forms/) is an optional headless schema engine for data-driven settings screens.

The look stays Craft-familiar — a bit nicer to use, not a separate product aesthetic bolted onto the control panel.

## Built with

These libraries power the shipped components (bundled as dependencies of `@verbb/plugin-kit-web`). You do not have to install them separately unless your plugin imports them directly alongside the kit.

- **[Lit](https://lit.dev/)** — custom element base and reactive rendering
- **[Floating UI](https://floating-ui.com/)** — positioning for popovers, menus, tooltips, and similar overlays
- **[TipTap](https://tiptap.dev/)** / **[ProseMirror](https://prosemirror.net/)** — rich text editing (`pk-tiptap-*` surfaces)

## Getting started

This path assumes a PHP-only plugin (or a small JS entry) and `<pk-*>` elements on a Craft CP page:

1. [Quick Start](./getting-started/quick-start) — bundler + Craft asset bundle
2. [No-Build Step](./getting-started/no-build-step) — `<link>` / `<script type="module">` only
3. [Tokens & CSS](./getting-started/tokens) — styling and shadow DOM
4. [Reducing FOUCE](./getting-started/fouce) — so undefined custom elements do not flash before they upgrade

Then browse the [component reference](./components/button) for props, events, and slots.
