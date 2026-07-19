import { computed, onBeforeUnmount, ref, type ComputedRef } from 'vue';

import type { SchemaFormEngineApi } from './engine/context.js';

const EMPTY_ERRORS: string[] = [];

export type EngineFieldBinding = {
    value: ComputedRef<unknown>;
    errors: ComputedRef<string[]>;
    isInvalid: ComputedRef<boolean>;
    setValue: (nextValue: unknown) => void;
    setTouched: () => void;
};

export const useEngineField = (form: SchemaFormEngineApi, name: string): EngineFieldBinding => {
    const version = ref(0);
    const unsubscribe = form.store.subscribe(() => {
        version.value += 1;
    });

    onBeforeUnmount(unsubscribe);

    const value = computed(() => {
        version.value;
        return form.getFieldValue(name);
    });
    const errors = computed(() => {
        version.value;
        return form.getErrorMapFields()[name] || EMPTY_ERRORS;
    });

    const setValue = (nextValue: unknown): void => {
        form.setFieldValue(name, nextValue);
    };

    const setTouched = (): void => {
        form.store.setTouched(name, true);
    };

    return {
        value,
        errors,
        isInvalid: computed(() => errors.value.length > 0),
        setValue,
        setTouched,
    };
};
