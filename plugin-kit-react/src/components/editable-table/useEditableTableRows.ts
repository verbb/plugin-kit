import {
    useCallback, useEffect, useRef, useState,
} from 'react';
import {
    normalizeCollection,
    createItem,
    deleteItem,
    updateItem,
} from '@verbb/plugin-kit-react/utils';
import type { EditableTableRow } from './types';

const reorderByIndex = (items: EditableTableRow[], from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) {
        return items;
    }

    const nextItems = [...items];
    const [moved] = nextItems.splice(from, 1);
    nextItems.splice(to, 0, moved);

    return nextItems;
};

export const useEditableTableRows = ({
    rows,
    onChange,
    newRowDefaults = {},
}: {
    rows: EditableTableRow[]
    onChange: (rows: EditableTableRow[]) => void
    newRowDefaults?: Record<string, unknown>
}) => {
    const [internalData, setInternalData] = useState<EditableTableRow[]>([]);
    const stableRowIdsRef = useRef<string[]>([]);
    const internalDataRef = useRef<EditableTableRow[]>([]);
    const skipNextRowsSyncRef = useRef(0);

    const rowsMatch = (prevRows: EditableTableRow[] = [], nextRows: EditableTableRow[] = []) => {
        if (prevRows.length !== nextRows.length) {
            return false;
        }

        for (let i = 0; i < prevRows.length; i++) {
            const prevRow = prevRows[i] || {};
            const nextRow = nextRows[i] || {};

            if (prevRow._id !== nextRow._id) {
                return false;
            }

            const keys = new Set([...Object.keys(prevRow), ...Object.keys(nextRow)]);
            for (const key of keys) {
                if (key === '_id') {
                    continue;
                }

                if (prevRow[key] !== nextRow[key]) {
                    return false;
                }
            }
        }

        return true;
    };

    useEffect(() => {
        if (!rows || rows.length === 0) {
            stableRowIdsRef.current = [];
            setInternalData([]);
            return;
        }

        if (skipNextRowsSyncRef.current > 0) {
            skipNextRowsSyncRef.current -= 1;
            return;
        }

        setInternalData((prevData) => {
            const normalizedRows = normalizeCollection(rows) as EditableTableRow[];
            const nextData = normalizedRows.map((normalizedRow, index) => {
                if (rows[index]?._id) {
                    stableRowIdsRef.current[index] = rows[index]._id;
                    return normalizedRow;
                }

                const stableId = prevData[index]?._id || stableRowIdsRef.current[index] || normalizedRow._id;
                stableRowIdsRef.current[index] = stableId;

                return { ...normalizedRow, _id: stableId };
            });

            stableRowIdsRef.current = stableRowIdsRef.current.slice(0, nextData.length);

            if (rowsMatch(prevData, nextData)) {
                return prevData;
            }

            return nextData;
        });
    }, [rows]);

    useEffect(() => {
        internalDataRef.current = internalData;
    }, [internalData]);

    const handleChange = useCallback((nextRows: EditableTableRow[]) => {
        onChange(nextRows);
    }, [onChange]);

    const addRow = useCallback(() => {
        const nextData = [...internalDataRef.current, createItem(newRowDefaults) as EditableTableRow];
        skipNextRowsSyncRef.current += 1;
        setInternalData(nextData);
        handleChange(nextData);
    }, [handleChange, newRowDefaults]);

    const removeRow = useCallback((row: EditableTableRow) => {
        const nextData = deleteItem(internalDataRef.current, row) as EditableTableRow[];
        skipNextRowsSyncRef.current += 1;
        setInternalData(nextData);
        handleChange(nextData);
    }, [handleChange]);

    const updateRow = useCallback((row: EditableTableRow, updates: Record<string, unknown>) => {
        const hasRealChange = Object.entries(updates).some(([key, val]) => {
            return row[key] !== val;
        });

        if (!hasRealChange) {
            return;
        }

        const nextData = updateItem(internalDataRef.current, row, updates) as EditableTableRow[];
        skipNextRowsSyncRef.current += 1;
        setInternalData(nextData);
        handleChange(nextData);
    }, [handleChange]);

    const moveRow = useCallback((row: EditableTableRow, direction: number) => {
        const prevData = internalDataRef.current;
        const index = prevData.findIndex((item) => { return item._id === row._id; });
        const nextIndex = index + direction;

        if (index === -1 || nextIndex < 0 || nextIndex >= prevData.length) {
            return;
        }

        const nextData = reorderByIndex(prevData, index, nextIndex);
        skipNextRowsSyncRef.current += 1;
        setInternalData(nextData);
        handleChange(nextData);
    }, [handleChange]);

    return {
        internalData,
        setInternalData,
        internalDataRef,
        skipNextRowsSyncRef,
        handleChange,
        addRow,
        removeRow,
        updateRow,
        moveRow,
    };
};
