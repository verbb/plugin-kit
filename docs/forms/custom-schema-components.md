# Custom Schema Components

Custom schema components let you teach SchemaForm a new `$cmp` node.

Use them when your schema needs a reusable wrapper, panel, tab layout, or any other structural React component that is more than a single form field.

That is the main difference from `$field`:

- `$field` usually binds one value.
- `$cmp` usually provides structure, layout, or richer rendering around other nodes.

## When to create one

Create a custom schema component when you want:

- A reusable section wrapper.
- A custom layout that should be available directly from PHP schema.
- A component that renders `children` inside a specific shell.
- A richer schema building block that is not just "another input field".

If the new thing should store its own value, create a [custom schema field](./custom-schema-fields.md) instead.

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

Keep the component in the frontend source tree and register it in the same bootstrap path that renders your SchemaForm screen.

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

## 2. Register it during bootstrap

Register the component in your CP entry **before** the first `SchemaFormEngine` render.

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

You can also register many at once:

```ts
import { registerFormComponents } from '@verbb/plugin-kit-react/forms';

registerFormComponents({
  SettingsPanel,
});
```

## 3. Reference it from PHP schema

Emit the component from PHP the same way you emit any other schema node.

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

When SchemaForm sees `$cmp: 'SettingsPanel'`, it looks up that name in the component registry and renders your React component.

## 4. Render the SchemaForm screen normally

Nothing special changes in the screen itself — still a normal `SchemaFormEngine`:

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

For the full PHP ↔ Twig ↔ React settings flow, see [Build a Settings Screen](./recipes/build-a-settings-screen.md).

## 5. When to use `usesSchemaNode`

Start **without** `usesSchemaNode`.

Only set:

```ts
SettingsPanel.usesSchemaNode = true;
```

when the component needs access to the raw schema node itself, not just the forwarded props and rendered children. That is useful for more advanced components, but it is not the default starting point.

When a schema component has `children`, those children have already been rendered for you by the engine.

## 6. What to verify

After wiring the component:

1. Confirm the component renders in the expected place.
2. Confirm its `children` render inside the wrapper.
3. Confirm the nested fields still validate and submit normally.
4. Confirm there are no `Unknown form component` warnings in the console.

## Related

- [Schema Components](./schema-components.md) — broader component model
- [SchemaForm Registry](./api/schema-form-registry.md) — registration API
- [Custom Schema Fields](./custom-schema-fields.md) — when the extension should own a value
- [Build a Settings Screen](./recipes/build-a-settings-screen.md) — end-to-end settings flow
