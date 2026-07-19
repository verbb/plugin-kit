# Schema Components

Schema components are the parts of SchemaForm that use `$cmp`.

Unlike schema fields, a schema component usually does not represent one stored value on its own. Instead, it provides structure, layout, or a reusable chunk of UI around other schema nodes.

## When to use a schema component

Use a schema component when your schema needs:

- a section wrapper
- a panel or card
- tabs
- a reusable layout pattern
- a richer React-powered container that should still be declared from PHP

If the node should bind directly to one form value, it is usually a schema field instead.

## Example

```json
{
  "$cmp": "FieldWrap",
  "label": "Email settings",
  "children": [
    {
      "$field": "text",
      "name": "fromName",
      "label": "From name"
    },
    {
      "$field": "text",
      "name": "fromEmail",
      "label": "From email"
    }
  ]
}
```

Here, `FieldWrap` is not the input itself. It is the structural container around a group of fields.

## Built-in schema components

SchemaForm ships with built-in schema components such as:

- [`FieldWrap`](./schema-components/field-wrap.md)
- [`ModalTabs`](./schema-components/modal-tabs.md)
- [`ModalTabsList`](./schema-components/modal-tabs-list.md)
- [`ModalTabsTrigger`](./schema-components/modal-tabs-trigger.md)
- [`ModalTabsContent`](./schema-components/modal-tabs-content.md)

You can also register your own `$cmp` names if your plugin needs a custom wrapper or layout component.

If you want to create your own, continue to [Custom Schema Components](./custom-schema-components.md).

## How they connect to React

When SchemaForm sees a `$cmp`, it looks up that name in the schema component registry and renders the matching React component.

That is why the process is:

1. Define the `$cmp` in PHP or schema JSON.
2. Register the matching React component during app bootstrap.
3. Render the SchemaForm screen.

## When not to create one

Do not reach for a schema component just because you need a heading or a simple wrapper.

If plain markup is enough, `$el` is often simpler:

```json
{
  "$el": "h2",
  "children": "Advanced settings"
}
```

Use a schema component when you need reusable React behavior, not just simple document structure.

## Next steps

- Read [Custom Schema Components](./custom-schema-components.md) to create and register your own.
- Browse the built-in schema component pages in this section for the packaged components.
- Read [SchemaForm Registry](./api/schema-form-registry.md) for the registration APIs.
