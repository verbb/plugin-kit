# `@verbb/plugin-kit-react`

Thin React facades over `@verbb/plugin-kit-web` custom elements via `@lit/react`.

React does **not** reimplement behavior or styles — it maps props and events to the web component. Importing a facade registers its element. Load tokens + FOUCE CSS as below.

## Install

```bash
npm install react react-dom @verbb/plugin-kit-react @verbb/plugin-kit-web
```

Craft Vite + asset-bundle wiring: [React quick start](https://docs.verbb.io/plugin-kit/react/getting-started/quick-start).

## Bootstrap

```tsx
import '@verbb/plugin-kit-react/style.css';

import { createRoot } from 'react-dom/client';
import { PluginKitProvider } from '@verbb/plugin-kit-react';
import { Button } from '@verbb/plugin-kit-react/components';

import { App } from './App';

createRoot(document.querySelector('#my-plugin-root')!).render(
  <PluginKitProvider translationCategory="my-plugin">
    <App />
  </PluginKitProvider>,
);
```

`PluginKitProvider` wires translations (defaults to `Craft.t` when present) and optional portal / host config. Pass `hostBridge: createCraftHostBridge()` only when you call Craft action / selector helpers. There is no `createReactApp` / `registerAll` step.

### Shadow DOM screens

```tsx
import pluginKitStyles from '@verbb/plugin-kit-react/style.css?inline';
import screenStyles from './screen.css?inline';
import { createRoot } from 'react-dom/client';
import { mountShadowApp, PluginKitProvider } from '@verbb/plugin-kit-react/utils';

const { mountNode, portalContainer } = mountShadowApp({
  element: '#my-plugin-root',
  styles: [pluginKitStyles, screenStyles],
});

createRoot(mountNode).render(
  <PluginKitProvider
    translationCategory="my-plugin"
    portalContainer={portalContainer}
  >
    <App />
  </PluginKitProvider>,
);
```

Keep a document-level `style.css` (or `plugin-kit.css`) import for FOUCE before first paint; inject tokens into the shadow root as above.

### Icons

`<Icon icon="…">` uses an opt-in registry — register named glyphs, or import `@verbb/plugin-kit-icons/all.js` for the full set:

```ts
import { registerIcons, plus, gear } from '@verbb/plugin-kit-icons';

registerIcons({ plus, gear });
```

## Components

### Facades (1:1 with a web component)

```tsx
import { Select, Option } from '@verbb/plugin-kit-react/components';

<Select value={value} onPkChange={(e) => setValue(e.detail.value)}>
  <Option value="a">Option A</Option>
</Select>
```

### `*Input` convenience wrappers

```tsx
import { CheckboxInput, RadioGroupInput, SelectInput } from '@verbb/plugin-kit-react/components';

<CheckboxInput checked={agreed} onCheckedChange={setAgreed}>I agree</CheckboxInput>
```

## Import paths

| Subpath | Purpose |
|---------|---------|
| `@verbb/plugin-kit-react` | Provider + common re-exports |
| `@verbb/plugin-kit-react/components` | UI facades (`Button`, TipTap, EditableTable, …) |
| `@verbb/plugin-kit-react/forms` | SchemaForm UI + registry (engine in `@verbb/plugin-kit-forms`) |
| `@verbb/plugin-kit-react/utils` | `mountShadowApp`, `createCraftHostBridge`, `configure`, `cn` |
| `@verbb/plugin-kit-react/hooks` | `useTranslation` |
| `@verbb/plugin-kit-react/fault` | Fault boundary / watchdog / support bundle |
| `@verbb/plugin-kit-react/app` | Provider / configure (parity with Vue `/app`) |
| `@verbb/plugin-kit-react/style.css` | Tokens + FOUCE + overlay chrome |

## Docs

- [docs.verbb.io/plugin-kit/react](https://docs.verbb.io/plugin-kit/react/)
- Workshop (monorepo): `npm run dev` → http://localhost:5175
