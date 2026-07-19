import type { SchemaFormComponent, SchemaFormFieldComponent } from './engine/context.js';
import { Separator } from '../components/Separator.js';
import {
    FieldWrap,
    ModalTabs,
    ModalTabsContent,
    ModalTabsList,
    ModalTabsTrigger,
} from './components/index.js';

// Explicit overrides and third-party custom fields. Built-in `$field` types resolve lazily
// via SchemaFormEngine — consumers do not register them at bootstrap.
const customFormFieldRegistry: Record<string, SchemaFormFieldComponent> = {};
const loadedBuiltinFormFieldCache: Record<string, SchemaFormFieldComponent> = {};

// Built-in `$cmp` keys seed the component registry (ModalTabs*/FieldWrap + shared chrome like Separator).
const formComponentRegistry: Record<string, SchemaFormComponent> = {
    FieldWrap,
    ModalTabs,
    ModalTabsList,
    ModalTabsTrigger,
    ModalTabsContent,
    Separator,
};

/** Override a built-in field or register a custom `$field` type plugin-kit does not ship. */
export const registerFormField = (name: string, component: SchemaFormFieldComponent): void => {
    customFormFieldRegistry[name] = component;
};

export const registerFormFields = (fields: Record<string, SchemaFormFieldComponent>): void => {
    Object.assign(customFormFieldRegistry, fields);
};

export const registerFormComponent = (name: string, component: SchemaFormComponent): void => {
    formComponentRegistry[name] = component;
};

export const registerFormComponents = (components: Record<string, SchemaFormComponent>): void => {
    Object.assign(formComponentRegistry, components);
};

export const cacheLoadedBuiltinFormField = (name: string, component: SchemaFormFieldComponent): void => {
    loadedBuiltinFormFieldCache[name] = component;
};

export const getRegisteredFormField = (name: string): SchemaFormFieldComponent | undefined => {
    return customFormFieldRegistry[name] ?? loadedBuiltinFormFieldCache[name];
};

export const getFormFieldRegistry = (): Record<string, SchemaFormFieldComponent> => {
    return {
        ...loadedBuiltinFormFieldCache,
        ...customFormFieldRegistry,
    };
};

export const getFormComponentRegistry = (): Record<string, SchemaFormComponent> => { return formComponentRegistry; };
