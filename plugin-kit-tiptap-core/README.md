# `@verbb/plugin-kit-tiptap-core`

Shared TipTap schema, extensions, toolbar helpers, and serialization for Plugin Kit rich-text surfaces.

You normally consume TipTap through UI packages (`pk-tiptap-*` / React/Vue facades). Use this package when you need the headless helpers without mounting an editor.

## Install

```bash
npm install @verbb/plugin-kit-tiptap-core
```

TipTap packages are dependencies of this package.

## What you get

| Area | Examples |
|------|----------|
| Extensions | `createTiptapExtensions`, `createTiptapInputExtensions`, variable-tag extension |
| Serialization | `valueToContent`, `contentToValue`, normalize / empty checks |
| Toolbar | presets, group menus, `runToolbarButton`, active-state helpers |
| Links | Craft element / URL link helpers |

Subpath exports: `./extensions`, `./toolbar`, `./links`, `./serialization/editor`, `./serialization/input`.

## UI entry points

| Surface | Import |
|---------|--------|
| Web | `@verbb/plugin-kit-web/components/tiptap-editor.js` (also `tiptap-input`, `tiptap-content`) |
| React | `TiptapEditor`, `TiptapInput`, `TiptapContent` from `@verbb/plugin-kit-react/components` |
| Vue | same names from `@verbb/plugin-kit-vue/components` |

## Docs

Component pages under [Web](https://docs.verbb.io/plugin-kit/web/components/tiptap-editor) / [React](https://docs.verbb.io/plugin-kit/react/components/tiptap-editor) / [Vue](https://docs.verbb.io/plugin-kit/vue/components/tiptap-editor).
