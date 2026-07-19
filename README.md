# Plugin Kit

Framework-agnostic Craft CP design system — web components first, with thin React and Vue adapters.

## Packages

| Package | Role |
|---------|------|
| `@verbb/plugin-kit-web` | Canonical `<pk-*>` UI (Lit + shadow DOM + tokens) |
| `@verbb/plugin-kit-react` | Thin React facades |
| `@verbb/plugin-kit-vue` | Thin Vue facades |
| `@verbb/plugin-kit-forms` | Headless SchemaForm engine |
| `@verbb/plugin-kit-icons` | Opt-in SVG icon registry for `<pk-icon>` / `<Icon>` |
| `@verbb/plugin-kit-core` | Host bridge helpers, shared utils, ESLint/Prettier presets |
| `@verbb/plugin-kit-tiptap-core` | Shared TipTap schema, extensions, serialization |
| `@verbb/plugin-kit-codemirror-core` | Shared CodeMirror setup for code editors |

## Architecture

```
@verbb/plugin-kit-tiptap-core / @verbb/plugin-kit-codemirror-core
                    ↓
         @verbb/plugin-kit-web     ← <pk-*> + --pk-* tokens
                    ↓
    @verbb/plugin-kit-react   @verbb/plugin-kit-vue
```

Behavior and styles live in `@verbb/plugin-kit-web`. Framework packages only map props, events, and slots.

## Consume

Prefer family imports (keeps TipTap / CodeMirror out of the bundle until you ask):

```ts
import '@verbb/plugin-kit-web/plugin-kit.css';
import '@verbb/plugin-kit-web/components/button.js';
```

```html
<pk-button variant="primary">Save</pk-button>
```

```tsx
import '@verbb/plugin-kit-react/style.css';
import { Button } from '@verbb/plugin-kit-react/components';
```

```vue
<script setup>
import '@verbb/plugin-kit-vue/style.css';
import { Button } from '@verbb/plugin-kit-vue/components';
</script>

<template>
  <Button variant="primary">Save</Button>
</template>
```

Use `@verbb/plugin-kit-web/register` only when you intentionally want the full library. See each package README and [docs.verbb.io/plugin-kit](https://docs.verbb.io/plugin-kit/) for Craft asset-bundle wiring.

## Dev

```bash
npm install
npm run build

# Component workshop → http://localhost:5175
npm run dev

# Docs → http://localhost:5281/plugin-kit/
npm run docs:dev
```

## Release

Lockstep publish (see `scripts/release.mjs`):

```bash
npm run release:publish-current -- --dry-run   # first 2.0.0 cut
npm run release:patch                          # later cuts (React Unreleased required)
```
