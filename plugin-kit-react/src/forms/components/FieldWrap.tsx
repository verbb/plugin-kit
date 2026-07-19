import { useMemo, useSyncExternalStore, type ReactNode } from 'react';

import { FieldLayout } from '../Field.js';
import type { SchemaFormComponentProps } from '../engine/context.js';
import { useSchemaEngineContext } from '../engine/context.js';
import type { SchemaRenderable } from '@verbb/plugin-kit-forms';

import { collectSchemaFieldNames } from './schemaErrors.js';

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

/**
 * Schema `$cmp: 'FieldWrap'` — labels a horizontal cluster of nested fields and
 * surfaces grouped nested errors on the wrapper (kit v1 FieldWrap contract).
 */
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
    children?: ReactNode;
}) => {
    const form = useSchemaEngineContext();
    const fieldName = name || label || 'field';
    const nestedFieldNames = useMemo(() => {
        return Array.from(collectSchemaFieldNames(schemaNode?.children || [] as SchemaRenderable));
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
        >
            {/*
              Horizontal control cluster (v1 FieldWrap). Nested pk-fields shrink via
              `[data-pk-field-wrap-controls] pk-field` in kit-react style.css — not a
              global unlabeled FieldLayout rule (that broke full-width conditions tables).
            */}
            <div
                data-pk-field-wrap-controls=""
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                }}
            >
                {children}
            </div>
        </FieldLayout>
    );
}, { usesSchemaNode: true as const });
