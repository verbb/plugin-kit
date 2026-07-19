# `@verbb/plugin-kit-forms`

Framework-agnostic **SchemaForm engine** — state, validation, schema traversal, and conditions — with **no UI framework dependencies**.

React and Vue layer their own renderer, field components, and registry on top:

- `@verbb/plugin-kit-react/forms`
- `@verbb/plugin-kit-vue/forms`

Most apps import those surfaces, not this package directly.

## Install

```bash
npm install @verbb/plugin-kit-forms
```

## What lives here

| Area | Contents |
|------|----------|
| State | `FormStateStore` (`subscribe` / path get-set, errors, touched, dirty) |
| Validation | `createValidationEngine`, built-in rule handlers (`required`, `min`, `max`, `email`, …) |
| Schema | `normalizeSchema`, types, traversal, Jexl `evaluateCondition` |
| i18n | `translate` / `setTranslateFunction` (falls back to `Craft.t`, then the raw message) |

## What stays out

`SchemaFormEngine`, `Field`, registries, and field components are framework-specific. Product-owned fields (handles, element selects, variable pickers, …) are registered by the host app — they are not kit builtins. Styling and controls live in `@verbb/plugin-kit-web`.

Builtin `$field` keys (documented under Forms): `text`, `textarea`, `number`, `select`, `radioGroup`, `lightswitch`, `color`, `checkboxSelect`, `combobox`, `group`, `date`, `codeEditor`.

## Engine usage

```ts
import {
  FormStateStore,
  createValidationEngine,
  normalizeSchema,
  setTranslateFunction,
  type SchemaIndex,
} from '@verbb/plugin-kit-forms';

setTranslateFunction((category, message, params) => Craft.t(category, message, params));

const store = new FormStateStore(defaultValues);
const index: SchemaIndex = {
  schema: normalizeSchema(compiled.schema),
  fieldEntries: compiled.fieldEntries,
};
const { validate } = createValidationEngine(index);

const result = validate(store.state.values);
```

## Dependencies

Runtime: [`jexl`](https://github.com/TomFrost/jexl), [`lodash-es`](https://lodash.com/). Kept external so consumers dedupe a single copy.

## Docs

[docs.verbb.io/plugin-kit/forms](https://docs.verbb.io/plugin-kit/forms/)
