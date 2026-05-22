# DateTimeField

## Basic Usage

Use `DateTimeField` when the schema needs a date and time value stored as one field.

<ComponentPreview src="./examples/date-time-field-basic.preview.tsx" />

## Registry

- **Key:** `date`
- **Module:** `src/forms/fields/DateTimeField.tsx`

## Role in SchemaForm

**`DatePicker`** + **`TimePicker`**; combines into an ISO string in the store (`useEffect` sync in source). Host locale/time options are available through the bridge when configured via **`createCraftHostBridge`**.

## Example schema

```json
{
  "$field": "date",
  "name": "startDate",
  "label": "Start date"
}
```

## Related

- Plain component docs: [DatePicker](../../components/date-picker.md) and [TimePicker](../../components/time-picker.md)
