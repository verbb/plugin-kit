# CalculationsField

## Basic Usage

Use `CalculationsField` when the schema needs a formula-style editor with validation support.

<ComponentPreview src="./examples/calculations-field-basic.preview.tsx" />

## Registry

- **Key:** `calculations`
- **Module:** `src/forms/fields/CalculationsField.tsx`
- **Primary UI:** `TiptapEditor` with `CalculationsToolbar`

## Role in SchemaForm

`CalculationsField` is a formula-oriented schema field built on [TipTap](https://tiptap.dev/) for authoring calculated expressions with variable insertion, inline guidance, and optional server-side validation.

It sits on top of the regular SchemaForm engine contract:

- reads and writes values through `useEngineField(form, field.name)`
- renders inside `FieldLayout`
- resolves variable categories from `VariableCategoriesContext`
- optionally calls `hostRequest(...)` to validate a formula against a CP action

## Common `field` props

In addition to the usual form field props like `name`, `label`, `instructions`, `warning`, `required`, and `disabled`, this field also supports calculation-specific configuration:

- `variableConfig`
- `variableCategories`
- `variablePickerTriggerCharacters`
- `validationAction`
- `rows`

## Example schema

```json
{
  "$field": "calculations",
  "name": "formula",
  "label": "Calculation",
  "instructions": "Use field variables to build the result.",
  "validationAction": "formie/form-builder/validate-calculation"
}
```

## Host bridge and validation

If you use `validationAction`, this field expects the app to be running in a configured host environment where `hostRequest(...)` can reach Craft CP.

In practice that means bootstrapping the app with:

```ts
configurePluginKitReact({
  hostBridge: createCraftHostBridge(),
});
```

## Related

- Plain component docs: [TiptapEditor](../../components/tiptap-editor.md)
- [SchemaForm Registry](../../api/schema-form-registry.md)
- [VariablePickerField](./variable-picker-field.md)
