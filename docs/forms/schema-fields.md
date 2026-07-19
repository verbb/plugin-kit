# Schema Fields

Schema fields are the parts of SchemaForm that use `$field`.

These are the nodes that bind to form values, render actual field UI, and participate in validation and error handling.

## What makes something a schema field

A schema field usually does three things:

1. Reads its current value from the form engine.
2. Writes changes back to the form engine.
3. Renders field UI such as a label, instructions, control, and errors.

For example:

```json
{
  "$field": "text",
  "name": "title",
  "label": "Title"
}
```

That tells SchemaForm to find the registered `text` field component and bind it to the `title` path.

## Built-in schema fields

Plugin Kit ships these `$field` types as lazy builtins (React and Vue):

- [`TextField`](./schema-fields/text-field.md)
- [`TextareaField`](./schema-fields/textarea-field.md)
- [`NumberField`](./schema-fields/number-field.md)
- [`RadioGroupField`](./schema-fields/radio-group-field.md)
- [`SelectField`](./schema-fields/select-field.md)
- [`LightswitchField`](./schema-fields/lightswitch-field.md)
- [`DateTimeField`](./schema-fields/date-time-field.md)
- [`GroupField`](./schema-fields/group-field.md)
- [`CodeEditorField`](./schema-fields/code-editor-field.md)
- [`CheckboxSelectField`](./schema-fields/checkbox-select-field.md)
- [`ColorField`](./schema-fields/color-field.md)
- [`ComboboxField`](./schema-fields/combobox-field.md)

Each built-in field page explains the schema shape and behavior for that type.

### Product-owned fields (not kit builtins)

Fields that encode product rules — Craft handles, Formie variables, element selectors, list/rich-text builders, static tables, formula editors — live in the consumer plugin and register via `registerFormFields()`. Formie does this with `registerFormieOwnedSchemaFields` (`handle`, `list`, `richText`, `variablePicker`, `elementSelect`, plus its own table variants).

Use [Custom Schema Fields](./custom-schema-fields.md) when your plugin needs a `$field` that is not in the kit list. For editable tabular data without a schema field, use the [`EditableTable`](/react/components/editable-table) component directly.

## Field anatomy

Most schema fields follow the same basic anatomy:

- value binding through the form engine
- field UI such as label, instructions, and errors
- the actual input component
- optional validation and grouped error behavior

That shared shape is why different field types still feel consistent in the UI.

### Anatomy props

Built-in schema fields pass their common presentation props through `FieldLayout`.

| Prop | What it controls |
| --- | --- |
| `label` | The field label. |
| `required` | Adds the required indicator beside the label. |
| `instructions` | Supporting help text below the label. Supports inline Markdown, including code. |
| `errors` | Field-level validation messages below the control. Supports inline Markdown, including code. |
| `warning` | Non-blocking warning text below errors. Supports inline Markdown, including code. |

Use plain text for most labels and messages. Use inline Markdown when the copy needs a link, emphasis, or a code-style token such as `gmail.com`.

## Related

- [Custom Schema Fields](./custom-schema-fields.md)
- [SchemaForm Registry](./api/schema-form-registry.md)
- [SchemaForm overview](./overview.md)
