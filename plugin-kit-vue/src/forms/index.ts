/** SchemaForm engine. Built-in `$field` types load lazily on first render. */
export * from './SchemaFormEngine.js';
export * from './Field.js';
export * from './useEngineField.js';
export * from './registry.js';
export * from './engine/context.js';
export { normalizeAttrs } from './utils.js';
export { isBuiltinFormFieldType, loadBuiltinFormField } from './builtin-field-loaders.js';

export { parseDateTimeParts, formatDateTimeParts, type DateTimeParts } from './datetime.js';
export {
    assertSchemaRegistry,
    debugSchemaRegistry,
    type AssertSchemaRegistryOptions,
    type SchemaRegistryIssue,
} from './assertSchemaRegistry.js';

/** Built-in `$cmp` wrappers (`ModalTabs*`, `FieldWrap`) auto-register via `./registry`. */
export {
    FieldWrap,
    ModalTabs,
    ModalTabsList,
    ModalTabsTrigger,
    ModalTabsContent,
    useModalTabsErrors,
} from './components/index.js';

// Field components: import from `@verbb/plugin-kit-vue/forms/fields/TextField`
// (etc.) when overriding a built-in or extending SchemaForm outside the lazy loader map.
