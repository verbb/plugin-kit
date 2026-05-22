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

SchemaForm includes built-in fields for common UI patterns, such as:

- [`TextField`](./schema-fields/text-field.md)
- [`TextareaField`](./schema-fields/textarea-field.md)
- [`NumberField`](./schema-fields/number-field.md)
- [`RadioGroupField`](./schema-fields/radio-group-field.md)
- [`SelectField`](./schema-fields/select-field.md)
- [`LightswitchField`](./schema-fields/lightswitch-field.md)
- [`DateTimeField`](./schema-fields/date-time-field.md)
- [`ListField`](./schema-fields/list-field.md)
- [`EditableTableField`](./schema-fields/editable-table-field.md)
- [`GroupField`](./schema-fields/group-field.md)
- [`RichTextField`](./schema-fields/rich-text-field.md)
- [`CheckboxSelectField`](./schema-fields/checkbox-select-field.md)
- [`ColorField`](./schema-fields/color-field.md)
- [`ComboboxField`](./schema-fields/combobox-field.md)
- [`ElementSelectField`](./schema-fields/element-select-field.md)
- [`HandleField`](./schema-fields/handle-field.md)
- [`StaticTableField`](./schema-fields/static-table-field.md)
- [`VariablePickerField`](./schema-fields/variable-picker-field.md)
- [`CalculationsField`](./schema-fields/calculations-field.md)

Each built-in field page in this section explains the specific schema shape and behavior for that field type.

If you want to create your own, continue to [Custom Schema Fields](./custom-schema-fields.md).

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

### Labels

Labels come from the schema field’s `label` property. Set `required` to show the required indicator.

<ComponentPreview src="./examples/schema-field-anatomy-labels.preview.tsx" />

### Instructions

Instructions come from `instructions` and appear below the label. They support inline Markdown and code.

<ComponentPreview src="./examples/schema-field-anatomy-instructions.preview.tsx" />

### Errors

Errors come from the form engine’s error map and appear below the control. They support inline Markdown and code.

<ComponentPreview src="./examples/schema-field-anatomy-errors.preview.tsx" />

### Warnings

Warnings come from `warning` and appear below errors as non-blocking guidance. They support inline Markdown and code.

<ComponentPreview src="./examples/schema-field-anatomy-warnings.preview.tsx" />

## When to create a custom schema field

Create a custom schema field when your plugin needs a new input type that should behave like a first-class field inside SchemaForm.

That usually means:

- it stores a value
- it should receive field-level errors
- it should be usable directly from PHP schema with its own `$field` key

If you need structure or layout rather than a value-bound input, you probably want a schema component instead.

## Next steps

- Read [Custom Schema Fields](./custom-schema-fields.md) to create and register your own field types.
- Browse the built-in schema field pages in this section for the packaged field types.
- Read [Conditions](./conditions.md) for validation and conditional behavior that often sits alongside field definitions.
