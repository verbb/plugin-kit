# SchemaForm Registry

Import from **`@verbb/plugin-kit-react/forms`**.

This is the canonical reference for registering custom SchemaForm fields and schema components.

Use this page when you need the exact registration functions and registry contracts. For the guided extension flow, use [custom schema components](../custom-schema-components.md) and [custom schema fields](../custom-schema-fields.md).

## API

```ts
import {
  registerFormField,
  registerFormFields,
  registerFormComponent,
  registerFormComponents,
  getFormFieldRegistry,
  getFormComponentRegistry,
} from '@verbb/plugin-kit-react/forms';
```

| Function | Behavior |
| --- | --- |
| `registerFormField(name, component)` | Sets one `$field` or `type` mapping. |
| `registerFormFields(map)` | Merges many field components. |
| `registerFormComponent(name, component)` | Sets one `$cmp` mapping. |
| `registerFormComponents(map)` | Merges many components. |
| `getFormFieldRegistry()` | Returns the current field registry. |
| `getFormComponentRegistry()` | Returns the current component registry. |

## Component contracts

- **Fields** use `SchemaFormFieldComponent`: props `{ schema, field, form, children? }`
- **Components** use `SchemaFormComponent`: schema props plus optional `children`
- Set `usesSchemaNode = true` on a schema component if it needs the raw `schemaNode`

## Built-in field keys

Lazy builtins (same keys in React and Vue):

`text`, `textarea`, `number`, `select`, `radioGroup`, `lightswitch`, `color`, `checkboxSelect`, `combobox`, `group`, `date`, `codeEditor`

Product-specific keys (`handle`, `list`, `richText`, `variablePicker`, `elementSelect`, formula editors, plugin table variants, etc.) are **not** kit builtins — register them in the consumer with `registerFormFields()`.

## Built-in component keys

The default component registry includes:

`FieldWrap`, `ModalTabs`, `ModalTabsList`, `ModalTabsTrigger`, `ModalTabsContent`

## Resolution order

Lookups are plain object reads, so the last registration wins.

Built-ins are registered first. Your plugin should register overrides or custom additions during bootstrap before the React app renders.

## Dev and HMR note

In development, `import.meta.hot.dispose` persists the registry on the HMR data object so custom registrations can survive reloads.

## Example

```ts
import { registerFormComponents, registerFormFields } from '@verbb/plugin-kit-react/forms';

registerFormComponents({
  SettingsPanel,
});

registerFormFields({
  apiToken: ApiTokenField,
});
```

## Related

- Read [SchemaForm API](./schema-form-api.md) for the engine reference.
- Read [custom schema components](../custom-schema-components.md) and [custom schema fields](../custom-schema-fields.md) for the guided extension docs.
- Read [schema components](../schema-components.md) and [schema fields](../schema-fields.md) for the broader mental model.
