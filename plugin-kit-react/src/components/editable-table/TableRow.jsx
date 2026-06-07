import React from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { RestrictToElement } from '@dnd-kit/dom/modifiers';
import {
    Button,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    TableRow as UITableRow,
    TableCell,
} from '@verbb/plugin-kit-react/components';
import { cn } from '@verbb/plugin-kit-react/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXmark, faArrowUp, faArrowDown, faEllipsis,
} from '@fortawesome/pro-solid-svg-icons';
import { RowDataCells } from './RowDataCells';

const SortableRow = ({
    row, rowIndex, allowReorder, className, children,
}) => {
    const sortable = useSortable({
        id: row._id,
        index: rowIndex,
        disabled: !allowReorder,
        modifiers: [
            RestrictToVerticalAxis,
            RestrictToElement.configure({
                element: (operation) => {
                    const sourceElement = operation?.source?.element;
                    return sourceElement?.parentElement ?? null;
                },
            }),
        ],
    });

    return (
        <UITableRow
            ref={sortable.ref}
            className={cn(
                sortable.isDragging && 'shadow-lg',
                className,
            )}
        >
            {children({ handleRef: sortable.handleRef })}
        </UITableRow>
    );
};

const PlainRow = ({ className, children }) => {
    return (
        <UITableRow className={className}>
            {typeof children === 'function' ? children({ handleRef: undefined }) : children}
        </UITableRow>
    );
};

export const TableRow = React.memo(({
    row,
    rowIndex,
    rowCount,
    columns,
    columnsSignature,
    useDnd,
    allowReorder,
    showReorderControls,
    allowDelete,
    modifyColumn,
    modifyRow,
    getCellErrors,
    onUpdateCell,
    moveRow,
    removeRow,
    t,
    renderRowActions,
    renderRowMenuItemsBeforeCore,
    renderRowMenuItemsAfterCore,
    renderRowMenuItems,
}) => {
    const RowComponent = useDnd ? SortableRow : PlainRow;

    return (
        <RowComponent
            row={row}
            rowIndex={rowIndex}
            allowReorder={allowReorder}
            className="bg-white"
        >
            {({ handleRef }) => {
                const dragHandleRef = useDnd ? handleRef : undefined;
                const rowModifications = modifyRow ? modifyRow(row, rowIndex) : null;
                const legacyBeforeRowMenuItems = renderRowMenuItems?.({
                    row,
                    rowIndex,
                    rowCount,
                });
                const customRowMenuItemsBeforeCore = renderRowMenuItemsBeforeCore?.({
                    row,
                    rowIndex,
                    rowCount,
                }) ?? legacyBeforeRowMenuItems;
                const customRowMenuItemsAfterCore = renderRowMenuItemsAfterCore?.({
                    row,
                    rowIndex,
                    rowCount,
                });
                const hasCustomRowMenuItemsBeforeCore = Boolean(customRowMenuItemsBeforeCore);
                const hasCustomRowMenuItemsAfterCore = Boolean(customRowMenuItemsAfterCore);
                const hasMoveActions = showReorderControls && rowCount > 1;
                const hasMenuActions = hasMoveActions || hasCustomRowMenuItemsBeforeCore || hasCustomRowMenuItemsAfterCore;

                return (
                    <>
                        <RowDataCells
                            row={row}
                            rowIndex={rowIndex}
                            columns={columns}
                            columnsSignature={columnsSignature}
                            modifyColumn={modifyColumn}
                            modifyRow={modifyRow}
                            getCellErrors={getCellErrors}
                            onUpdateCell={onUpdateCell}
                        />
                        {(showReorderControls || allowDelete) && (
                            <TableCell
                                className={cn(
                                    rowModifications?.cellClassName ?? 'bg-[#fbfcfe]',
                                )}
                                title={rowModifications?.title}
                            >
                                <div className="flex items-center px-1">
                                    {showReorderControls && (
                                        <span ref={dragHandleRef}>
                                            <Button
                                                type="button"
                                                variant="none"
                                                size="xs"
                                                disabled={!useDnd}
                                                className={cn(
                                                    'cursor-move',
                                                    'p-0 w-[24px] h-[24px]',
                                                    'text-gray-500',
                                                    'hover:bg-transparent',
                                                    'active:bg-transparent',
                                                    'hover:text-blue-500',
                                                    !useDnd && 'opacity-40 cursor-default',
                                                )}
                                            >
                                                <div className="size-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" focusable="false" aria-hidden="true"><path fill="currentColor" d="M71.3 295.6c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2s-57.4 21.9-79.2 0zM184.4 182.5c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2-57.3 21.8-79.2 0zm0 147c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.9-21.8-21.9-57.3 0-79.2zM297.5 216.4c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.8-21.9-21.8-57.3 0-79.2z"></path></svg>
                                                </div>
                                            </Button>
                                        </span>
                                    )}
                                    {showReorderControls && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                render={(
                                                    <Button
                                                        type="button"
                                                        variant="none"
                                                        size="xs"
                                                        disabled={!hasMenuActions}
                                                        className={cn(
                                                            'p-0 w-[24px] h-[24px]',
                                                            'text-gray-500',
                                                            'hover:bg-transparent',
                                                            'active:bg-transparent',
                                                            'hover:text-blue-500',
                                                            !hasMenuActions && 'opacity-40 cursor-not-allowed',
                                                        )}
                                                        aria-label={t('Row actions')}
                                                    />
                                                )}
                                            >
                                                <FontAwesomeIcon icon={faEllipsis} className="size-[12px]" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {customRowMenuItemsBeforeCore}
                                                {hasCustomRowMenuItemsBeforeCore && hasMoveActions && <DropdownMenuSeparator />}
                                                {showReorderControls && rowIndex > 0 && (
                                                    <DropdownMenuItem onClick={() => { return moveRow(row, -1); }}>
                                                        <FontAwesomeIcon icon={faArrowUp} />
                                                        {t('Move up')}
                                                    </DropdownMenuItem>
                                                )}
                                                {showReorderControls && rowIndex < rowCount - 1 && (
                                                    <DropdownMenuItem onClick={() => { return moveRow(row, 1); }}>
                                                        <FontAwesomeIcon icon={faArrowDown} />
                                                        {t('Move down')}
                                                    </DropdownMenuItem>
                                                )}
                                                {hasMoveActions && hasCustomRowMenuItemsAfterCore && <DropdownMenuSeparator />}
                                                {customRowMenuItemsAfterCore}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                    {renderRowActions?.({
                                        row,
                                        rowIndex,
                                        rowCount,
                                    })}
                                    {allowDelete && (
                                        <Button
                                            type="button"
                                            variant="none"
                                            size="xs"
                                            onClick={() => { return removeRow(row); }}
                                            className={cn(
                                                'p-0 w-[24px] h-[24px]',
                                                'text-gray-500',
                                                'hover:bg-transparent',
                                                'active:bg-transparent',
                                                'hover:text-red-500',
                                            )}
                                        >
                                            <FontAwesomeIcon icon={faXmark} className="size-[12px] mt-[2px]" />
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        )}
                    </>
                );
            }}
        </RowComponent>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.row === nextProps.row
        && prevProps.rowIndex === nextProps.rowIndex
        && prevProps.rowCount === nextProps.rowCount
        && prevProps.columnsSignature === nextProps.columnsSignature
        && prevProps.getCellErrors === nextProps.getCellErrors
        && prevProps.useDnd === nextProps.useDnd
        && prevProps.allowReorder === nextProps.allowReorder
        && prevProps.showReorderControls === nextProps.showReorderControls
        && prevProps.allowDelete === nextProps.allowDelete
        && prevProps.modifyRow === nextProps.modifyRow
        && prevProps.renderRowActions === nextProps.renderRowActions
        && prevProps.renderRowMenuItemsBeforeCore === nextProps.renderRowMenuItemsBeforeCore
        && prevProps.renderRowMenuItemsAfterCore === nextProps.renderRowMenuItemsAfterCore
        && prevProps.renderRowMenuItems === nextProps.renderRowMenuItems
    );
});
