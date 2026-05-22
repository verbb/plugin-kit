import {
    useCallback,
    useEffect,
    useRef,
    type MutableRefObject,
    type Dispatch,
    type SetStateAction,
} from 'react';
import {
    updateItem,
    generateHandle,
} from '@verbb/plugin-kit-react/utils';
import {
    GENERATED_CELL_MODE,
    isGeneratedColumn,
    getGeneratedCellKey,
    isEmptyCellValue,
} from './helpers';
import type {
    EditableTableColumn,
    EditableTableOnCellChange,
    EditableTableRow,
} from './types';

type UseEditableTableCellChangeArgs = {
    internalData: EditableTableRow[]
    internalDataRef: MutableRefObject<EditableTableRow[]>
    setInternalData: Dispatch<SetStateAction<EditableTableRow[]>>
    skipNextRowsSyncRef: MutableRefObject<number>
    generatedColumns: EditableTableColumn[]
    onCellChange?: EditableTableOnCellChange | null
    updateRow: (row: EditableTableRow, updates: Record<string, unknown>) => void
    handleChange: (rows: EditableTableRow[]) => void
};

type PendingCellChange = {
    rowIndex: number;
    columnName: string;
    value: unknown;
    row: EditableTableRow;
};

export const useEditableTableCellChange = ({
    internalData,
    internalDataRef,
    setInternalData,
    skipNextRowsSyncRef,
    generatedColumns,
    onCellChange,
    updateRow,
    handleChange,
}: UseEditableTableCellChangeArgs) => {
    const pendingCellChangesRef = useRef<Map<string, PendingCellChange>>(new Map());
    const cellChangesRafRef = useRef<number | null>(null);
    const generatedCellModesRef = useRef<Map<string, string>>(new Map());

    useEffect(() => {
        if (internalData.length === 0 || generatedColumns.length === 0) {
            generatedCellModesRef.current.clear();
            return;
        }

        const validKeys = new Set<string>();

        internalData.forEach((row) => {
            generatedColumns.forEach((column) => {
                const key = getGeneratedCellKey(row._id, column.name);
                validKeys.add(key);

                if (generatedCellModesRef.current.has(key)) {
                    return;
                }

                const value = row[column.name];
                generatedCellModesRef.current.set(key, isEmptyCellValue(value) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.SEEDED);
            });
        });

        Array.from(generatedCellModesRef.current.keys()).forEach((key) => {
            if (!validKeys.has(key)) {
                generatedCellModesRef.current.delete(key);
            }
        });
    }, [generatedColumns, internalData]);

    const flushPendingCellChanges = useCallback(() => {
        cellChangesRafRef.current = null;

        if (!onCellChange || pendingCellChangesRef.current.size === 0) {
            return;
        }

        const entries = Array.from(pendingCellChangesRef.current.values());
        pendingCellChangesRef.current.clear();
        entries.forEach(({
            rowIndex, columnName, value, row,
        }) => {
            onCellChange(rowIndex, columnName, value, row);
        });
    }, [onCellChange]);

    useEffect(() => {
        return () => {
            if (cellChangesRafRef.current !== null && typeof cancelAnimationFrame === 'function') {
                cancelAnimationFrame(cellChangesRafRef.current);
            }

            flushPendingCellChanges();
        };
    }, [flushPendingCellChanges]);

    const handleCellValueChange = useCallback((rowIndex: number, row: EditableTableRow, column: EditableTableColumn, newValue: unknown) => {
        if (column.type === 'radio') {
            const nextChecked = Boolean(newValue);
            const updatesByRowId = new Map<string, Record<string, unknown>>();
            const allowUnselect = Boolean(column.allowUnselect);

            if (nextChecked) {
                internalDataRef.current.forEach((item) => {
                    const currentValue = Boolean(item[column.name]);
                    const targetValue = item._id === row._id;
                    if (currentValue !== targetValue) {
                        updatesByRowId.set(item._id, { [column.name]: targetValue });
                    }
                });
            } else if (allowUnselect && Boolean(row[column.name])) {
                updatesByRowId.set(row._id, { [column.name]: false });
            } else {
                return;
            }

            if (updatesByRowId.size === 0) {
                return;
            }

            const nextData = internalDataRef.current.map((item) => {
                const rowUpdates = updatesByRowId.get(item._id);
                return rowUpdates ? { ...item, ...rowUpdates } : item;
            });

            skipNextRowsSyncRef.current += 1;
            setInternalData(nextData);

            if (onCellChange) {
                updatesByRowId.forEach((updates, rowId) => {
                    const targetRow = internalDataRef.current.find((item) => { return item._id === rowId; });
                    const targetRowIndex = internalDataRef.current.findIndex((item) => { return item._id === rowId; });
                    if (!targetRow || targetRowIndex === -1) {
                        return;
                    }

                    Object.entries(updates).forEach(([columnName, value]) => {
                        const key = `${rowId || targetRowIndex}:${columnName}`;
                        pendingCellChangesRef.current.set(key, {
                            rowIndex: targetRowIndex,
                            columnName,
                            value,
                            row: targetRow,
                        });
                    });
                });

                if (cellChangesRafRef.current === null) {
                    if (typeof requestAnimationFrame === 'function') {
                        cellChangesRafRef.current = requestAnimationFrame(flushPendingCellChanges);
                    } else {
                        flushPendingCellChanges();
                    }
                }

                return;
            }

            handleChange(nextData);
            return;
        }

        if (isGeneratedColumn(column)) {
            const targetKey = getGeneratedCellKey(row._id, column.name);
            generatedCellModesRef.current.set(targetKey, GENERATED_CELL_MODE.MANUAL);
        }

        const sourceUpdate = { [column.name]: newValue };
        const derivedUpdates: Record<string, unknown> = {};

        generatedColumns.forEach((targetColumn) => {
            if (targetColumn.source !== column.name) {
                return;
            }

            const targetKey = getGeneratedCellKey(row._id, targetColumn.name);
            const currentTargetValue = row[targetColumn.name];
            const existingMode = generatedCellModesRef.current.get(targetKey)
                ?? (isEmptyCellValue(currentTargetValue) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.SEEDED);

            if (existingMode === GENERATED_CELL_MODE.MANUAL || existingMode === GENERATED_CELL_MODE.SEEDED) {
                return;
            }

            if (targetColumn.type === 'handle') {
                derivedUpdates[targetColumn.name] = generateHandle(String(newValue ?? ''));
                generatedCellModesRef.current.set(targetKey, GENERATED_CELL_MODE.AUTO);
            } else if (targetColumn.type === 'value') {
                derivedUpdates[targetColumn.name] = newValue;
                generatedCellModesRef.current.set(targetKey, GENERATED_CELL_MODE.AUTO);
            }
        });

        const allUpdates = { ...sourceUpdate, ...derivedUpdates };
        const hasRealChange = Object.entries(allUpdates).some(([key, value]) => {
            return row[key] !== value;
        });
        if (!hasRealChange) {
            return;
        }

        if (column.onChange) {
            column.onChange(newValue, row, column.name);
        }

        if (onCellChange) {
            skipNextRowsSyncRef.current += 1;
            setInternalData((prevData) => {
                return updateItem(prevData, row, allUpdates);
            });

            Object.entries(allUpdates).forEach(([columnName, value]) => {
                const key = `${row._id || rowIndex}:${columnName}`;
                pendingCellChangesRef.current.set(key, {
                    rowIndex,
                    columnName,
                    value,
                    row,
                });
            });

            if (cellChangesRafRef.current === null) {
                if (typeof requestAnimationFrame === 'function') {
                    cellChangesRafRef.current = requestAnimationFrame(flushPendingCellChanges);
                } else {
                    flushPendingCellChanges();
                }
            }

            return;
        }

        updateRow(row, allUpdates);
    }, [flushPendingCellChanges, generatedColumns, handleChange, internalDataRef, onCellChange, setInternalData, skipNextRowsSyncRef, updateRow]);

    return {
        handleCellValueChange,
    };
};
