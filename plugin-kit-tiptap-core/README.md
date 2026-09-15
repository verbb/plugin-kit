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
| TextStyle | built-in Small caps and constrained declarative style definitions |
| Links | Craft element / URL link helpers |

Subpath exports: `./extensions`, `./registry`, `./toolbar`, `./links`, `./serialization/editor`, `./serialization/input`.

## Extending the document schema

Register custom TipTap nodes, marks, or behaviour extensions before the first `TiptapEditor` or `TiptapContent` mounts. Registrations are additive for the current application bundle; core schema names cannot be replaced.

```ts
import { Mark } from '@tiptap/core';
import {
    registerTiptapExtension,
    registerTiptapToolbarControl,
} from '@verbb/plugin-kit-tiptap-core';

registerTiptapExtension({
    id: 'acme/abbr',
    extension: () => Mark.create({
        name: 'abbr',
        parseHTML: () => [{ tag: 'abbr' }],
        renderHTML: ({ HTMLAttributes }) => ['abbr', HTMLAttributes, 0],
    }),
});

registerTiptapToolbarControl({
    id: 'abbr',
    label: 'Abbreviation',
    run: (editor) => editor.chain().focus().toggleMark('abbr').run(),
    isActive: (editor) => editor.isActive('abbr'),
});
```

Add the control ID (`abbr` above) to an editor's `buttons` or structured `toolbar` configuration. Extensions target both editable editors and read-only content by default; use `surfaces: ['editor']` only for behaviour that does not participate in stored content. Factories are recommended when an extension has mutable per-editor state.

Persisted custom nodes and marks are a data-contract change. Register a matching server-side extension when rendering through `verbb/tiptap`, and make sure every editor and renderer that can encounter that JSON understands the same schema. Plugin Kit does not load third-party scripts or expose a Craft global; the consuming application owns that bootstrap and load order.

For a safe visual-only style, register one serializable definition instead of writing an extension and control separately:

```ts
import { registerTiptapTextStyleDefinition } from '@verbb/plugin-kit-tiptap-core';

registerTiptapTextStyleDefinition({
    id: 'acme-uppercase',
    label: 'Uppercase',
    attribute: 'textTransform',
    cssProperty: 'text-transform',
    allowedValues: ['uppercase'],
    toolbarValue: 'uppercase',
});
```

Only known `font-variant-caps` and `text-transform` values are accepted. The definition installs the matching global `textStyle` attribute on editor and content surfaces and adds its toolbar toggle. Server-rendered applications must provide the same definition to their PHP renderer.

## UI entry points

| Surface | Import |
|---------|--------|
| Web | `@verbb/plugin-kit-web/components/tiptap-editor.js` (also `tiptap-input`, `tiptap-content`) |
| React | `TiptapEditor`, `TiptapInput`, `TiptapContent` from `@verbb/plugin-kit-react/components` |
| Vue | same names from `@verbb/plugin-kit-vue/components` |

## Docs

Component pages under [Web](https://docs.verbb.io/plugin-kit/web/components/tiptap-editor) / [React](https://docs.verbb.io/plugin-kit/react/components/tiptap-editor) / [Vue](https://docs.verbb.io/plugin-kit/vue/components/tiptap-editor).
