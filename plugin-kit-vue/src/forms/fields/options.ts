import { computed, onBeforeUnmount, ref, type ComputedRef } from 'vue';
import { evaluateCondition } from '@verbb/plugin-kit-forms';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import type { SchemaFormEngineApi } from '../engine/context.js';

export type ConditionalOption = {
    value: unknown;
    label: string;
    description?: string;
    disabled?: boolean;
    if?: string;
    [key: string]: unknown;
};

export const useFilteredOptions = (
    form: SchemaFormEngineApi,
    field: SchemaNode,
): ComputedRef<ConditionalOption[]> => {
    const version = ref(0);
    const unsubscribe = form.store.subscribe(() => {
        version.value += 1;
    });

    onBeforeUnmount(unsubscribe);

    return computed(() => {
        version.value;

        const scopePath = typeof field._scopePath === 'string' ? field._scopePath : '';
        const scopedValues = scopePath ? form.getFieldValue(scopePath) : null;
        const scopedObject = scopedValues && typeof scopedValues === 'object' && !Array.isArray(scopedValues)
            ? scopedValues as Record<string, unknown>
            : {};
        const fieldData = field._data && typeof field._data === 'object' ? field._data : {};
        const conditionData = {
            ...(form.store.state.values || {}),
            ...scopedObject,
            ...fieldData,
        };
        const options = Array.isArray(field.options) ? field.options as ConditionalOption[] : [];

        return options.filter((option) => {
            if (!option?.if) {
                return true;
            }

            return evaluateCondition(option.if, conditionData);
        });
    });
};
