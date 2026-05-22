import {
    useCallback, useEffect, useRef, useSyncExternalStore,
} from 'react';
import type { SchemaFormEngineApi } from './engine/context';
import { useEngineField } from './useEngineField';

type EditableTableBindingForm = SchemaFormEngineApi & {
    recomputeGroupedErrorsForPath?: (path: string) => void;
};

export const useEditableTableFieldBinding = (form: EditableTableBindingForm, fieldName: string) => {
    const { value, setValue } = useEngineField(form, fieldName);
    const rows = Array.isArray(value) ? value : [];

    const fieldPrefix = `${fieldName}.`;
    const cellErrorsCacheRef = useRef<{ snapshot: Record<string, unknown>; deps: string }>({ snapshot: {}, deps: '' });
    const errorsCacheRef = useRef<{ snapshot: string[]; deps: string }>({ snapshot: [], deps: '' });

    const cellErrors = useSyncExternalStore(
        form?.store?.subscribe?.bind(form.store) ?? (() => { return () => {}; }),
        () => {
            const errorMap = form?.getErrorMapFields?.() || {};
            const entries = Object.entries(errorMap).filter(([key]) => { return key.startsWith(fieldPrefix); });
            const deps = entries.map(([k, v]) => { return `${k}:${JSON.stringify(v)}`; }).join('|');

            if (cellErrorsCacheRef.current.deps === deps) {
                return cellErrorsCacheRef.current.snapshot;
            }

            const snapshot = Object.fromEntries(entries);
            cellErrorsCacheRef.current = { snapshot, deps };
            return snapshot;
        },
        () => { return {}; },
    );

    const rawErrors = useSyncExternalStore(
        form?.store?.subscribe?.bind(form.store) ?? (() => { return () => {}; }),
        () => {
            const next =
                form?.getGroupedErrorsForPath?.(fieldName)
                    ?? form?.getErrorMapFields?.()[fieldName]
                    ?? [];
            const arr = Array.isArray(next) ? next : [];
            const deps = JSON.stringify(arr);

            if (errorsCacheRef.current.deps === deps) {
                return errorsCacheRef.current.snapshot;
            }

            errorsCacheRef.current = { snapshot: arr, deps };
            return errorsCacheRef.current.snapshot;
        },
        () => { return []; },
    );
    const errors = Array.isArray(rawErrors) ? rawErrors : [];

    const pendingCellUpdatesRef = useRef<Map<string, unknown>>(new Map());
    const rafIdRef = useRef<number | null>(null);

    const flushPendingCellUpdates = useCallback(() => {
        rafIdRef.current = null;

        if (pendingCellUpdatesRef.current.size === 0) {
            return;
        }

        const updates = Array.from(pendingCellUpdatesRef.current.entries());
        pendingCellUpdatesRef.current.clear();
        const errorMap = form?.getErrorMapFields?.() || {};

        updates.forEach(([path, nextValue]) => {
            form.setFieldValue(path, nextValue);

            // Recomputing grouped errors on every keystroke is expensive for large tables.
            // Only recompute if this cell currently has an error entry.
            if (errorMap[path]) {
                form.recomputeGroupedErrorsForPath?.(path);
            }
        });
    }, [form]);

    useEffect(() => {
        return () => {
            if (rafIdRef.current !== null && typeof cancelAnimationFrame === 'function') {
                cancelAnimationFrame(rafIdRef.current);
            }

            flushPendingCellUpdates();
        };
    }, [flushPendingCellUpdates]);

    const handleCellChange = useCallback((rowIndex: number, columnName: string, nextValue: unknown) => {
        const path = `${fieldName}.${rowIndex}.${columnName}`;
        pendingCellUpdatesRef.current.set(path, nextValue);

        if (rafIdRef.current !== null) {
            return;
        }

        if (typeof requestAnimationFrame === 'function') {
            rafIdRef.current = requestAnimationFrame(flushPendingCellUpdates);
            return;
        }

        // Fallback for non-browser test or non-browser environments.
        flushPendingCellUpdates();
    }, [fieldName, flushPendingCellUpdates]);

    return {
        rows,
        setRows: setValue,
        errors,
        cellErrors,
        handleCellChange,
    };
};
