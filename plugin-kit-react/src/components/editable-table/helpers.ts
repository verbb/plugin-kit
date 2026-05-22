import type { EditableTableColumn } from './types';

export const GENERATED_CELL_MODE = {
    EMPTY: 'empty',
    AUTO: 'auto',
    MANUAL: 'manual',
    SEEDED: 'seeded',
} as const;

export const isGeneratedColumn = (column: EditableTableColumn) => {
    return (column?.type === 'handle' || column?.type === 'value') && column?.name && column?.source;
};

export const isThinColumn = (column: EditableTableColumn) => {
    return Boolean(column?.thin || column?.type === 'checkbox' || column?.type === 'lightswitch' || column?.type === 'radio');
};

export const getGeneratedCellKey = (rowId: string, columnName: string) => {
    return `${rowId}:${columnName}`;
};

export const isEmptyCellValue = (value: unknown) => {
    return value === undefined || value === null || value === '';
};
