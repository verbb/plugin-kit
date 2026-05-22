# Register a Custom SchemaForm Component

Use this recipe when SchemaForm already fits the screen, but the built-in schema components are not enough.

This is the canonical way to add a new `$cmp` node that PHP schema can reference directly.

Choose a custom schema component when you need:

- a reusable wrapper around child schema nodes
- a section or panel shell that should be emitted from PHP
- layout or structure, not a new value-bound input

If the new thing should store its own value, create a custom schema field instead.

## What you are building

In this recipe you will:

1. create a React component called `SettingsPanel`
2. register it under the schema key `SettingsPanel`
3. reference it from PHP schema with `$cmp`
4. render it inside a normal `SchemaFormEngine`

That gives your PHP schema a new structural building block without needing to hard-code the layout in every screen.

## Recommended file shape

```text
src/
  web/
    assets/
      cp/
        src/
          cp.tsx
          schema-components/
            SettingsPanel.tsx
          settings/
            SettingsApp.tsx
```

Keep the component itself in the frontend source tree and register it in the same bootstrap path that renders your SchemaForm screen.

## 1. Create the React component

Create a component that receives normal schema props plus rendered `children`.

```tsx
import type { SchemaFormComponent } from '@verbb/plugin-kit-react/forms/engine/context';

export const SettingsPanel: SchemaFormComponent = ({ title, children }) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <header className="border-b border-slate-200 pb-3">
        <h2 className="text-base font-semibold text-slate-950">{String(title)}</h2>
      </header>

      <div className="mt-4 grid grid-cols-1 gap-4">
        {children}
      </div>
    </section>
  );
};
```

This is the standard shape for a schema component:

- it receives forwarded schema props such as `title`
- it renders `children` where nested schema nodes should appear
- it does not manage its own form value

## 2. Register the component before render

Register the component in your CP entry before your app renders.

```tsx
import { createRoot } from 'react-dom/client';
import '@verbb/plugin-kit-react/style.css';

import { configurePluginKitReact, createCraftHostBridge } from '@verbb/plugin-kit-react/utils';
import { registerFormComponent } from '@verbb/plugin-kit-react/forms';
import { SettingsApp } from './settings/SettingsApp';
import { SettingsPanel } from './schema-components/SettingsPanel';

configurePluginKitReact({
  hostBridge: createCraftHostBridge(),
  translationCategory: 'my-plugin',
});

registerFormComponent('SettingsPanel', SettingsPanel);

const container = document.getElementById('my-plugin-root');

if (container) {
  const payload = JSON.parse(container.dataset.settings ?? '{}');

  createRoot(container).render(
    <SettingsApp
      schemaIndex={payload.schemaIndex}
      initialValues={payload.values ?? {}}
    />,
  );
}
```

Do this before the first `SchemaFormEngine` render. That way the engine already knows how to resolve `$cmp: 'SettingsPanel'`.

## 3. Reference it from PHP schema

Now emit the component from PHP the same way you emit any other schema node.

```php
$schemaIndex = [
    'schema' => [
        [
            '$cmp' => 'SettingsPanel',
            'title' => Craft::t('my-plugin', 'Display settings'),
            'children' => [
                [
                    '$field' => 'text',
                    'name' => 'heading',
                    'label' => Craft::t('my-plugin', 'Heading'),
                    'required' => true,
                ],
                [
                    '$field' => 'lightswitch',
                    'name' => 'showIcon',
                    'label' => Craft::t('my-plugin', 'Show icon'),
                ],
            ],
        ],
    ],
    'fieldEntries' => [
        [
            'path' => 'heading',
            'field' => [
                '$field' => 'text',
                'name' => 'heading',
                'label' => Craft::t('my-plugin', 'Heading'),
                'required' => true,
            ],
        ],
        [
            'path' => 'showIcon',
            'field' => [
                '$field' => 'lightswitch',
                'name' => 'showIcon',
                'label' => Craft::t('my-plugin', 'Show icon'),
            ],
        ],
    ],
];
```

The important part is the `$cmp` key. When SchemaForm sees that node, it looks up `SettingsPanel` in the registered component registry and renders your React component.

## 4. Render the SchemaForm screen normally

Nothing special changes in the screen itself. Your app still renders the same `SchemaFormEngine`.

```tsx
import { useEffect } from 'react';
import { Button } from '@verbb/plugin-kit-react/components';
import { SchemaFormEngine, useSchemaFormEngine } from '@verbb/plugin-kit-react/forms';
import { hostRequest } from '@verbb/plugin-kit-react/utils';

export function SettingsApp({ schemaIndex, initialValues }) {
  const form = useSchemaFormEngine({
    schemaIndex,
    defaultValues: initialValues,
  });

  useEffect(() => {
    form.onSubmit(async (values) => {
      await hostRequest('POST', 'my-plugin/settings/save', {
        data: values,
      });
    });

    return () => {
      form.onSubmit(null);
    };
  }, [form]);

  return (
    <div className="space-y-4">
      <SchemaFormEngine form={form} className="grid grid-cols-1 gap-4" />

      <div>
        <Button type="button" variant="primary" onClick={() => { form.handleSubmit(); }}>
          Save
        </Button>
      </div>
    </div>
  );
}
```

The custom component becomes just another part of the schema tree.

## 5. When to use `usesSchemaNode`

Start without `usesSchemaNode`.

Only set:

```ts
SettingsPanel.usesSchemaNode = true;
```

when the component needs access to the raw schema node itself, not just the forwarded props and rendered children.

That is useful for more advanced components, but it is not the default starting point.

## 6. What to verify

After wiring the component:

1. confirm the component renders in the expected place
2. confirm its `children` render inside the wrapper
3. confirm the nested fields still validate and submit normally
4. confirm there are no `Unknown form component` warnings in the console

## Next step

Once this pattern is working, keep using custom schema components for layout and structure only.

If the next extension should own its own value, validation, and error handling, move to [Custom Schema Fields](../forms/custom-schema-fields.md) instead.
