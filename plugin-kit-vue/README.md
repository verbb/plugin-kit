# `@verbb/plugin-kit-vue`

Thin Vue facades over `@verbb/plugin-kit-web` custom elements via `@lit-labs/vue-utils`.

Vue does **not** reimplement behavior or styles — it maps props, events, and slots to the web component. Importing a facade registers its element. Load tokens + FOUCE CSS as below.

## Install

```bash
npm install vue @verbb/plugin-kit-vue @verbb/plugin-kit-web
```

Craft Vite + asset-bundle wiring: [Vue quick start](https://docs.verbb.io/plugin-kit/vue/getting-started/quick-start).

## Bootstrap

Use Vue’s `createApp` plus `PluginKitProvider`. There is no `createVueApp` / `registerAll` step.

```ts
import '@verbb/plugin-kit-vue/style.css';

import { createApp, h } from 'vue';
import { PluginKitProvider } from '@verbb/plugin-kit-vue';
import App from './App.vue';

createApp({
  setup() {
    return () => h(PluginKitProvider, { translationCategory: 'my-plugin' }, {
      default: () => h(App),
    });
  },
}).mount('#my-plugin-root');
```

`PluginKitProvider` wires translations (defaults to `Craft.t` when present) and optional portal / host config. Pass `hostBridge: createCraftHostBridge()` only when you call Craft action / selector helpers.

### Shadow DOM screens

```ts
import pluginKitStyles from '@verbb/plugin-kit-vue/style.css?inline';
import screenStyles from './screen.css?inline';
import { createApp, h } from 'vue';
import { mountShadowApp, PluginKitProvider } from '@verbb/plugin-kit-vue/app';
import App from './App.vue';

const { mountNode, portalContainer } = mountShadowApp({
  element: '#my-plugin-root',
  styles: [pluginKitStyles, screenStyles],
});

createApp({
  setup() {
    return () => h(PluginKitProvider, {
      translationCategory: 'my-plugin',
      portalContainer,
    }, {
      default: () => h(App),
    });
  },
}).mount(mountNode);
```

### Icons

`<Icon icon="…">` uses an opt-in registry — register named glyphs, or import `@verbb/plugin-kit-icons/all.js`:

```ts
import { registerIcons, plus, gear } from '@verbb/plugin-kit-icons';

registerIcons({ plus, gear });
```

## Components

### Facades (1:1 with a web component)

```vue
<script setup>
import { Select, Option } from '@verbb/plugin-kit-vue/components';
</script>

<template>
  <Select :value="value" @pk-change="value = $event.detail.value">
    <Option value="a">Option A</Option>
  </Select>
</template>
```

### `*Input` convenience wrappers

```vue
<script setup>
import { CheckboxInput, Lightswitch, RadioGroupInput, SelectInput } from '@verbb/plugin-kit-vue/components';

const agreed = ref(false);
const enabled = ref(true);
const channel = ref('email');
</script>

<template>
  <CheckboxInput v-model:checked="agreed">I agree</CheckboxInput>
  <Lightswitch v-model:checked="enabled" />
  <RadioGroupInput
    v-model="channel"
    :options="[
      { value: 'email', label: 'Email' },
      { value: 'sms', label: 'SMS' },
    ]"
  />
  <SelectInput v-model="channel" :options="[{ value: 'email', label: 'Email' }]" />
</template>
```

Boolean controls use `v-model:checked`. Option-based wrappers use `v-model`.

## Import paths

| Subpath | Purpose |
|---------|---------|
| `@verbb/plugin-kit-vue` | Provider + common re-exports |
| `@verbb/plugin-kit-vue/components` | UI facades (same catalog as React) |
| `@verbb/plugin-kit-vue/forms` | SchemaForm UI + registry |
| `@verbb/plugin-kit-vue/app` | Provider, `mountShadowApp`, configure |
| `@verbb/plugin-kit-vue/utils` | Host bridge, `cn`, shared helpers |
| `@verbb/plugin-kit-vue/hooks` | `useTranslation` |
| `@verbb/plugin-kit-vue/fault` | Fault boundary / watchdog / support bundle |
| `@verbb/plugin-kit-vue/style.css` | Tokens + FOUCE + overlay chrome |

## Docs

- [docs.verbb.io/plugin-kit/vue](https://docs.verbb.io/plugin-kit/vue/)
- Workshop (monorepo): `npm run dev` → http://localhost:5175
