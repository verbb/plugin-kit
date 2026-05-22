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

## React component example

```tsx
import type { SchemaFormComponent } from '@verbb/plugin-kit-react/forms/engine/context';

const SettingsPanel: SchemaFormComponent = ({ title, children }) => {
  return (
    <section className="rounded border p-4">
      <h3>{String(title)}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
};

SettingsPanel.usesSchemaNode = true;
```

If `usesSchemaNode` is set to `true`, SchemaForm also passes the full `schemaNode` into the component. That is useful when your component needs access to raw schema data instead of just the forwarded props.

When a schema component has `children`, those children have already been rendered for you by the engine.

## Register it during bootstrap

```ts
import { registerFormComponents } from '@verbb/plugin-kit-react/forms';

registerFormComponents({
  SettingsPanel,
});
```

Like custom fields, this should happen before your React app renders the SchemaForm screen.

## Reference it from PHP schema

```php
$schema[] = [
    '$cmp' => 'SettingsPanel',
    'title' => Craft::t('my-plugin', 'Advanced settings'),
    'children' => [
        [
            '$field' => 'text',
            'name' => 'subtitle',
            'label' => Craft::t('my-plugin', 'Subtitle'),
        ],
    ],
];
```

That is the key idea: PHP emits the `$cmp`, and your React bootstrap tells SchemaForm which component should handle that name.

## Related

- Read [Schema Components](./schema-components.md) for the broader component model.
- Read [SchemaForm Registry](../api/schema-form-registry.md) for the registration API.
- Read the recipe to [register a custom SchemaForm component](../recipes/register-a-custom-schemaform-component.md).
