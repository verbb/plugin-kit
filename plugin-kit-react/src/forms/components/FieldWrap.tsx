import { useMemo, useSyncExternalStore } from 'react';

import { FieldLayout, InlineFieldErrorVisibilityContext } from '../Field';
import type { SchemaFormComponentProps } from '../engine/context';
import { useSchemaEngineContext } from '../engine/context';
import type { SchemaRenderable } from '../engine/SchemaIndex';

const collectFieldNames = (schema: SchemaRenderable, names: Set<string>) => {
    if (Array.isArray(schema)) {
        schema.forEach((entry) => {
            collectFieldNames(entry, names);
        });
        return;
    }

    if (!schema || typeof schema !== 'object') {
        return;
    }

    if (schema.$field && typeof schema.name === 'string' && schema.name) {
        names.add(schema.name);
    }

    if (Array.isArray(schema.children)) {
        collectFieldNames(schema.children, names);
    }

    if (Array.isArray(schema.schema)) {
        collectFieldNames(schema.schema, names);
    }
};

const ATTRIBUTE_MESSAGE_PATTERN = /^(.+?) (cannot be blank\.|must be .+)$/;

const formatWrapperMessage = (message: string, wrapperLabel?: string) => {
    if (!wrapperLabel) {
        return message;
    }

    const match = String(message).match(ATTRIBUTE_MESSAGE_PATTERN);
    if (match) {
        const [, , suffix] = match;
        return `${wrapperLabel} ${suffix}`;
    }

    return `${wrapperLabel} ${message}`;
};

export const FieldWrap = Object.assign(({
    name,
    label,
    instructions,
    required,
    warning,
    children,
    schemaNode,
}: SchemaFormComponentProps & {
    name?: string;
    label?: string;
    instructions?: string;
    required?: boolean;
    warning?: string;
}) => {
    const form = useSchemaEngineContext();
    const fieldName = name || label || 'field';
    const nestedFieldNames = useMemo(() => {
        const names = new Set<string>();
        collectFieldNames(schemaNode?.children || [], names);
        return Array.from(names);
    }, [schemaNode]);
    const errorMap = useSyncExternalStore(
        form.store.subscribe.bind(form.store),
        () => {
            return (form.getErrorMapFields() || {}) as Record<string, string[]>;
        },
        () => {
            return {} as Record<string, string[]>;
        },
    );
    const errors = useMemo(() => {
        if (name && typeof form?.getGroupedErrorsForPath === 'function') {
            return form.getGroupedErrorsForPath(name) || [];
        }

        if (!nestedFieldNames.length) {
            return [];
        }

        const groupedErrors: string[] = [];

        nestedFieldNames.forEach((fieldPath) => {
            (errorMap[fieldPath] || []).forEach((message: string) => {
                groupedErrors.push(formatWrapperMessage(String(message), label || name || fieldName));
            });

            Object.entries(errorMap).forEach(([errorPath, messages]) => {
                if (!errorPath.startsWith(`${fieldPath}.`)) {
                    return;
                }

                (messages || []).forEach((message: string) => {
                    groupedErrors.push(formatWrapperMessage(String(message), label || name || fieldName));
                });
            });
        });

        return Array.from(new Set(groupedErrors));
    }, [errorMap, fieldName, form, label, name, nestedFieldNames]);

    return (
        <FieldLayout
            name={fieldName}
            label={label}
            instructions={instructions}
            required={required}
            warning={warning}
            errors={errors}
            withControl={false}
        >
            <InlineFieldErrorVisibilityContext.Provider value={false}>
                <div className="flex items-center flex-row gap-2">
                    {children}
                </div>
            </InlineFieldErrorVisibilityContext.Provider>
        </FieldLayout>
    );
}, { usesSchemaNode: true as const });
