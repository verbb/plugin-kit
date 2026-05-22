import {
    useCallback, useEffect, useState,
} from 'react';
import { isSortable } from '@dnd-kit/react/sortable';
import type { EditableTableRow } from './types';

export const useEditableTableDnd = ({
    allowReorder,
    internalData,
    handleChange,
}: {
    allowReorder: boolean
    internalData: EditableTableRow[]
    handleChange: (rows: EditableTableRow[]) => void
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isDndHydrated, setIsDndHydrated] = useState(false);

    useEffect(() => {
        if (!allowReorder) {
            setIsDndHydrated(false);
            return;
        }

        let idleId: number | null = null;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        const enableDnd = () => { setIsDndHydrated(true); };

        if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
            idleId = window.requestIdleCallback(enableDnd, { timeout: 1200 });
        } else {
            timeoutId = setTimeout(enableDnd, 250);
        }

        return () => {
            if (idleId !== null && typeof window !== 'undefined' && typeof window.cancelIdleCallback === 'function') {
                window.cancelIdleCallback(idleId);
            }

            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        };
    }, [allowReorder]);

    const handleDragStart = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleDragEnd = useCallback((event: { canceled?: boolean; operation?: { source?: unknown } }) => {
        setIsDragging(false);

        if (!allowReorder) {
            return;
        }

        if (event.canceled) {
            return;
        }

        const { source } = event.operation ?? {};
        if (!isSortable(source)) {
            return;
        }

        if (!('initialIndex' in source) || typeof source.initialIndex !== 'number') {
            return;
        }

        const { initialIndex, index } = source;
        if (initialIndex === index) {
            return;
        }

        if (initialIndex < 0 || index < 0 || initialIndex >= internalData.length || index >= internalData.length) {
            return;
        }

        const nextRows = [...internalData];
        const [movedRow] = nextRows.splice(initialIndex, 1);
        nextRows.splice(index, 0, movedRow);

        handleChange(nextRows);
    }, [allowReorder, handleChange, internalData]);

    const effectiveAllowReorder = allowReorder;

    return {
        isDragging,
        isDndHydrated,
        effectiveAllowReorder,
        handleDragStart,
        handleDragEnd,
    };
};
