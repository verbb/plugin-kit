import type { SchemaFormFieldComponent } from './engine/context.js';

type BuiltinFieldLoader = () => Promise<SchemaFormFieldComponent>;

/**
 * Built-in SchemaForm `$field` types load on first render so CP bundles only pay for
 * field modules that appear in the active schema (e.g. no CodeMirror until `codeEditor`).
 */
export const builtinFormFieldLoaders: Record<string, BuiltinFieldLoader> = {
    text: async () => (await import('./fields/TextField.js')).TextField as SchemaFormFieldComponent,
    textarea: async () => (await import('./fields/TextareaField.js')).TextareaField as SchemaFormFieldComponent,
    number: async () => (await import('./fields/NumberField.js')).NumberField as SchemaFormFieldComponent,
    select: async () => (await import('./fields/SelectField.js')).SelectField as SchemaFormFieldComponent,
    lightswitch: async () => (await import('./fields/LightswitchField.js')).LightswitchField as SchemaFormFieldComponent,
    color: async () => (await import('./fields/ColorField.js')).ColorField as SchemaFormFieldComponent,
    radioGroup: async () => (await import('./fields/RadioGroupField.js')).RadioGroupField as SchemaFormFieldComponent,
    checkboxSelect: async () => (await import('./fields/CheckboxSelectField.js')).CheckboxSelectField as SchemaFormFieldComponent,
    combobox: async () => (await import('./fields/ComboboxField.js')).ComboboxField as SchemaFormFieldComponent,
    group: async () => (await import('./fields/GroupField.js')).GroupField as SchemaFormFieldComponent,
    date: async () => (await import('./fields/DateTimeField.js')).DateTimeField as SchemaFormFieldComponent,
    codeEditor: async () => (await import('./fields/CodeEditorField.js')).CodeEditorField as SchemaFormFieldComponent,
};

export const isBuiltinFormFieldType = (name: string): boolean => {
    return Object.prototype.hasOwnProperty.call(builtinFormFieldLoaders, name);
};

export const loadBuiltinFormField = async (name: string): Promise<SchemaFormFieldComponent | null> => {
    const loader = builtinFormFieldLoaders[name];

    if (!loader) {
        return null;
    }

    return loader();
};
