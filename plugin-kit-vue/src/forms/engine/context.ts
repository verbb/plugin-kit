import { inject, provide, type Component, type InjectionKey, type VNodeChild } from 'vue';
import type {
    FormStateStore,
    FormValues,
    NestedFormApi,
    SchemaFieldApi,
    SchemaIndex,
    SchemaNode,
    SchemaRenderable,
} from '@verbb/plugin-kit-forms';

export type {
    FormValues,
    NestedFormApi,
    SchemaFieldApi,
} from '@verbb/plugin-kit-forms';

export type SchemaFieldRenderProps = {
    name: string;
    children: (fieldApi: SchemaFieldApi) => VNodeChild;
};

export type SchemaFormFieldComponentProps = {
    schema: SchemaNode;
    field: SchemaNode;
    form: SchemaFormEngineApi;
};

export type SchemaFormFieldComponent = Component;

export type SchemaFormComponentProps = Record<string, unknown> & {
    schemaNode?: SchemaNode;
};

export type SchemaFormComponent = Component & {
    usesSchemaNode?: boolean;
};

export type SchemaFormEngineApi = {
    schema: SchemaRenderable;
    store: FormStateStore;
    index: SchemaIndex;
    Field: Component;
    getFieldValue: (path: string) => unknown;
    setFieldValue: (path: string, value: unknown) => void;
    getErrorMapFields: () => Record<string, string[]>;
    handleSubmit: () => Promise<void>;
    onChange: (handler: ((value: FormValues) => void) | null) => void;
    onSubmit: (handler: ((value: FormValues) => Promise<void> | void) | null) => void;
    onError: (handler: ((errors: Record<string, unknown>) => void) | null) => void;
    onSuccess: (handler: ((value: FormValues) => void) | null) => void;
    registerNestedForm: (path: string, api: NestedFormApi) => void;
    unregisterNestedForm: (path: string) => void;
    getGroupedErrorsForPath?: (path: string) => string[];
    SchemaRenderer?: Component<{ schema: SchemaRenderable }>;
    getConditionContext?: (values: FormValues, field?: SchemaNode) => Record<string, unknown>;
};

export const SchemaEngineContextKey: InjectionKey<SchemaFormEngineApi> = Symbol('SchemaEngineContext');

export const provideSchemaEngineContext = (form: SchemaFormEngineApi): void => {
    provide(SchemaEngineContextKey, form);
};

export const useSchemaEngineContext = (): SchemaFormEngineApi => {
    const context = inject(SchemaEngineContextKey, null);

    if (!context) {
        throw new Error('useSchemaEngineContext must be used within a SchemaEngineProvider');
    }

    return context;
};
