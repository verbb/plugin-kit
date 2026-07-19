import React, { createContext, useContext } from 'react';
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
    children: (fieldApi: SchemaFieldApi) => React.ReactNode;
};

export type SchemaFormFieldComponentProps = {
    schema: SchemaNode;
    field: SchemaNode;
    form: SchemaFormEngineApi;
    children?: React.ReactNode;
};

export type SchemaFormFieldComponent = React.ComponentType<SchemaFormFieldComponentProps>;

export type SchemaFormComponentProps = Record<string, unknown> & {
    children?: React.ReactNode;
    schemaNode?: SchemaNode;
};

export type SchemaFormComponent = React.ComponentType<SchemaFormComponentProps> & {
    usesSchemaNode?: boolean;
};

export type SchemaFormEngineApi = {
    schema: SchemaRenderable;
    store: FormStateStore;
    index: SchemaIndex;
    Field: React.ComponentType<SchemaFieldRenderProps>;
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
    SchemaRenderer?: React.ComponentType<{ schema: SchemaRenderable }>;
    getConditionContext?: (values: FormValues, field?: SchemaNode) => Record<string, unknown>;
};

export const SchemaEngineContext = createContext<SchemaFormEngineApi | null>(null);

export const useSchemaEngineContext = () => {
    const context = useContext(SchemaEngineContext);

    if (!context) {
        throw new Error('useSchemaEngineContext must be used within a SchemaEngineProvider');
    }

    return context;
};
