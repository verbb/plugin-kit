# VariablePickerField

## Basic Usage

Use `VariablePickerField` when the schema needs token-aware plain-text input.

<ComponentPreview src="./examples/variable-picker-field-basic.preview.tsx" />

## Registry

- **Key:** `variablePicker`
- **Module:** `src/forms/fields/VariablePickerField.tsx`

## Role in SchemaForm

Inserts variable tokens into content (email bodies, notifications, etc.) using [TipTap](https://tiptap.dev/) variable picker UI. Category lists can be supplied through **`VariableCategoriesProvider`** / **`useVariableCategoriesContext`** (`src/forms/contexts/VariableCategoriesContext.tsx`).

## Integration

Wrap the engine (or app root) with:

```tsx
import { VariableCategoriesProvider } from '@verbb/plugin-kit-react/forms';

<VariableCategoriesProvider value={{ getVariableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry }}>
  <SchemaFormEngine form={form} />
</VariableCategoriesProvider>
```

## Example schema

```json
{
  "$field": "variablePicker",
  "name": "subject",
  "label": "Subject"
}
```

## Related

- Plain component docs: [TiptapInput](../../components/tiptap-input.md)
