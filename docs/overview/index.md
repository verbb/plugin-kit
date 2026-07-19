# Plugin Kit

Plugin Kit is [Verbb](https://verbb.io)'s design system for Craft CMS control panel interfaces — web components first, with thin React and Vue adapters on top.

It exists for the Craft screens that outgrow Twig macros and one-off jQuery: complex forms, searchable pickers, rich text, conditionals, modals, builders, and similar. Small server-rendered settings pages do not need it. When you do need a richer UI, Plugin Kit gives you CP-aware components, host integration helpers, and a shared look — without every plugin reinventing that stack.

## How it fits together

One design system, several entry points:

- **`@verbb/plugin-kit-web`** owns the UI — Lit custom elements (`<pk-*>`), shadow DOM, and `--pk-*` tokens. Look, behaviour, and accessibility live here.
- **`@verbb/plugin-kit-react`** and **`@verbb/plugin-kit-vue`** are thin adapters over those same elements, so you get familiar props and imports without a second component library.
- **`@verbb/plugin-kit-forms`** is a headless schema form engine for data-driven settings screens.

The goal is Craft-familiar UI that feels a bit nicer to use — not a separate product aesthetic bolted onto the control panel.

## Packages

| Package | Role |
|---------|------|
| `@verbb/plugin-kit-web` | Canonical `<pk-*>` web components |
| `@verbb/plugin-kit-react` | React adapters |
| `@verbb/plugin-kit-vue` | Vue adapters |
| `@verbb/plugin-kit-forms` | Headless schema form engine |

Most projects install one UI package (`web`, `react`, or `vue`), then add forms only if needed.

## Where to start

Pick the surface that matches how your plugin builds CP JavaScript:

| If you… | Start here | Example |
|---------|------------|---------|
| Already use React, or need a large interactive app | [React](/react/getting-started/overview) | Formie — complex builder UI on React, so it uses `@verbb/plugin-kit-react` |
| Already use (or prefer) Vue | [Vue](/vue/) | Same components; Vue-shaped imports |
| Stay on vanilla JS / no framework | [Web components](/web/) | Hyper — otherwise vanilla JS, so it uses `@verbb/plugin-kit-web` directly |

Each getting-started guide covers the Craft wiring: Vite frontend, asset bundle, mount element, first component.

After that: [schema-driven forms](/forms/), or the component reference for your chosen surface.
