# Schema Structure

SchemaForm supports three main kinds of nodes:

| Schema node | Purpose | Typical use |
| --- | --- | --- |
| `$field` | A field that binds to form state. | Text inputs, selects, lightswitches, tables |
| `$cmp` | A registered React component. | Wrappers, panels, tabs, layout helpers |
| `$el` | A plain HTML element. | Headings, text, simple containers |

That means one schema can mix real inputs, structure, and lightweight markup.

## `$field`

Use `$field` when the node should read from and write to the form values.

```json
{
  "$field": "text",
  "name": "title",
  "label": "Title",
  "required": true
}
```

This tells SchemaForm to find the registered `text` field component and bind it to the `title` value in the form state.

## `$cmp`

Use `$cmp` when the node should render a schema component instead of a single field.

```json
{
  "$cmp": "FieldWrap",
  "label": "Advanced settings",
  "children": [
    {
      "$field": "text",
      "name": "apiKey",
      "label": "API key"
    }
  ]
}
```

Schema components are often used for:

- section wrappers
- layout containers
- tabs
- custom UI that should be reusable from PHP schema

## `$el`

Use `$el` for plain HTML content that does not need its own registered React component.

```json
{
  "$el": "p",
  "attrs": {
    "class": "text-sm text-slate-500"
  },
  "children": "This text is rendered as normal HTML."
}
```

This is useful for headings, helper text, and simple wrappers that do not justify a custom schema component.

## Configuration

Different nodes support different options, but some schema keys come up frequently:

| Key | What it does |
| --- | --- |
| `name` | The value path for a field, such as `title` or `settings.apiKey`. |
| `label` | Human-readable label for fields or wrappers. |
| `instructions` | Supporting help text. |
| `children` | Nested schema nodes inside the current node. |
| `schema` | Nested schema used by schema field types like lists or groups. |
| `props` | Extra props passed into a schema component. |
| `attrs` | HTML attributes for `$el` nodes. |
| `if` | Condition that controls visibility. |
| `hideOnIf` | Hides a node instead of fully unmounting it when the condition fails. |
| `validation` | Validation rules for a field. |

```json
[
  {
    "$el": "h2",
    "children": "Display settings"
  },
  {
    "$field": "text",
    "name": "title",
    "label": "Title",
    "validation": "required|min:3"
  },
  {
    "$field": "lightswitch",
    "name": "showAdvanced",
    "label": "Show advanced settings"
  },
  {
    "$cmp": "FieldWrap",
    "label": "Advanced settings",
    "if": "showAdvanced == true",
    "children": [
      {
        "$field": "text",
        "name": "subtitle",
        "label": "Subtitle"
      }
    ]
  }
]
```

This one schema uses all three node types:

- `$el` for a heading
- `$field` for real form inputs
- `$cmp` for a conditional wrapper section

## Related

- Read [SchemaForm Overview](./overview.md) for the PHP-to-React integration flow.
- Read [Conditions](./conditions.md) for conditional logic and validation-related rules.
- Read [Schema Components](./schema-components.md) and [Schema Fields](./schema-fields.md) for the two main extension surfaces.
