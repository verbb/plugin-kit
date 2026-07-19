import { useSyncExternalStore } from 'react';
import type { SchemaFormEngineApi } from './engine/context.js';

const EMPTY_ERRORS: string[] = [];

export const useEngineField = (form: SchemaFormEngineApi, name: string) => {
    const value = useSyncExternalStore(
        form.store.subscribe.bind(form.store),
        () => { return form.getFieldValue(name); },
        () => { return form.getFieldValue(name); },
    );
    const errors = useSyncExternalStore(
        form.store.subscribe.bind(form.store),
        () => { return form.getErrorMapFields()[name] || EMPTY_ERRORS; },
        () => { return form.getErrorMapFields()[name] || EMPTY_ERRORS; },
    );

    const setValue = (nextValue: unknown) => {
        form.setFieldValue(name, nextValue);
    };

    const setTouched = () => {
        form.store.setTouched(name, true);
    };

    return {
        value,
        errors,
        isInvalid: errors.length > 0,
        setValue,
        setTouched,
    };
};
