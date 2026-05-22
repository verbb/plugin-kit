import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import type { SchemaNode, SchemaRenderable } from '../engine/SchemaIndex';

type GroupFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name?: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        schema?: SchemaRenderable;
        children?: SchemaRenderable;
    };
    children?: ReactNode;
};

const prefixGroupSchema = (schema: SchemaRenderable, prefix: string, scopePath: string): SchemaRenderable => {
    if (Array.isArray(schema)) {
        return schema.map((item) => {
            return prefixGroupSchema(item, prefix, scopePath);
        });
    }

    if (!schema || typeof schema !== 'object') {
        return schema;
    }

    const nextSchema: SchemaNode = { ...schema };
    const hasScope = typeof scopePath === 'string' && scopePath;

    if (hasScope && !nextSchema._scopePath) {
        nextSchema._scopePath = scopePath;
    }

    if (typeof nextSchema.name === 'string' && nextSchema.name && nextSchema.$field) {
        nextSchema.name = `${prefix}${nextSchema.name}`;
    }

    // Let nested group fields scope their own descendants to avoid double-prefixing.
    if (nextSchema.$field !== 'group') {
        if (Array.isArray(nextSchema.schema)) {
            nextSchema.schema = prefixGroupSchema(nextSchema.schema, prefix, scopePath);
        }

        if (Array.isArray(nextSchema.children)) {
            nextSchema.children = prefixGroupSchema(nextSchema.children, prefix, scopePath);
        }
    }

    return nextSchema;
};

export const GroupField = ({ form, field, children }: GroupFieldProps) => {
    const Renderer = form?.SchemaRenderer;
    const prefix = field.name ? `${field.name}.` : '';
    const scopedSchema = useMemo(() => {
        const schema = field.schema ?? field.children ?? children ?? [];

        if (!prefix) {
            return schema;
        }

        return prefixGroupSchema(schema, prefix, field.name || '');
    }, [children, field.children, field.name, field.schema, prefix]);

    if (!Renderer) {
        return null;
    }

    const errors = field.name
        ? form?.getGroupedErrorsForPath?.(field.name) ?? form?.getErrorMapFields?.()[field.name] ?? []
        : [];

    if (field.label || field.instructions || field.warning) {
        return (
            <FieldLayout
                name={field.name || 'group'}
                label={field.label}
                instructions={field.instructions}
                warning={field.warning}
                required={field.required}
                errors={errors}
                withControl={false}
            >
                <Renderer schema={scopedSchema} />
            </FieldLayout>
        );
    }

    return <Renderer schema={scopedSchema} />;
};
