import React from 'react';
import { TableCell as UITableCell } from '@verbb/plugin-kit-react/components';
import { cn } from '@verbb/plugin-kit-react/utils';
import { TableCell } from './TableCell';

const isThinColumn = (column) => {
    return Boolean(column?.thin || column?.type === 'checkbox' || column?.type === 'lightswitch' || column?.type === 'radio');
};

export const RowDataCells = React.memo(({
    row,
    rowIndex,
    columns,
    columnsSignature,
    modifyColumn,
    modifyRow,
    getCellErrors,
    onUpdateCell,
}) => {
    const rowModifications = modifyRow ? modifyRow(row, rowIndex) : null;

    return columns.map((column) => {
        const columnModifications = modifyColumn ? modifyColumn(row, column.name) : null;

        return (
            <UITableCell
                key={column.name}
                className={cn(
                    column.className,
                    rowModifications?.cellClassName,
                    columnModifications?.cellClassName,
                )}
                title={rowModifications?.title ?? columnModifications?.title}
            >
                <TableCell
                    row={row}
                    rowIndex={rowIndex}
                    column={column}
                    value={row[column.name]}
                    modifyColumn={modifyColumn}
                    getCellErrors={getCellErrors}
                    onUpdateCell={onUpdateCell}
                />
            </UITableCell>
        );
    });
}, (prevProps, nextProps) => {
    return (
        prevProps.row === nextProps.row
        && prevProps.rowIndex === nextProps.rowIndex
        && prevProps.columnsSignature === nextProps.columnsSignature
        && prevProps.getCellErrors === nextProps.getCellErrors
        && prevProps.modifyRow === nextProps.modifyRow
    );
});
