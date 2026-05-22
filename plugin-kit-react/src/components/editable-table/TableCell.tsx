import {
    Input,
    Textarea,
    SelectInput,
    ComboboxInput,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    Checkbox,
    Lightswitch,
    ColorInput,
    DatePicker,
    TimePicker,
} from '@verbb/plugin-kit-react/components';
import type { ComponentProps } from 'react';
import { useMemo, useState } from 'react';
import { useVariablePicker } from '@verbb/plugin-kit-react/components/tiptap/useVariablePicker';
import type { VariableGroup } from '@verbb/plugin-kit-react/components/tiptap/VariableCommandList';
import { VariableCommandList } from '@verbb/plugin-kit-react/components/tiptap/VariableCommandList';
import type { VariableOption } from '@verbb/plugin-kit-react/components/tiptap/VariableDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEllipsis } from '@fortawesome/pro-solid-svg-icons';
import { cn } from '@verbb/plugin-kit-react/utils';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import type {
    EditableTableColumn,
    EditableTableModifyColumn,
    EditableTableRow,
} from './types';

type Props = {
    column: EditableTableColumn;
    value: unknown;
    row: EditableTableRow;
    rowIndex: number;
    modifyColumn?: EditableTableModifyColumn | null;
    getCellErrors: (rowIndex: number, columnName: string) => unknown[];
    onUpdateCell: (rowIndex: number, row: EditableTableRow, column: EditableTableColumn, newValue: unknown) => void;
};

function VariablePickerCell({
    finalColumn,
    value,
    updateValue,
    isInvalid,
}: {
    finalColumn: EditableTableColumn;
    value: unknown;
    updateValue: (newValue: unknown) => void;
    isInvalid: boolean;
}) {
    const t = useTranslation();
    const [open, setOpen] = useState(false);
    const picker = useVariablePicker({
        variableCategories: finalColumn.variableCategories || {},
        variableCategoryLabels: finalColumn.variableCategoryLabels || {},
        variableCategoryOrder: finalColumn.variableCategoryOrder || [],
        isOpen: open,
        onApply: (_baseVariable, variable) => {
            updateValue(String(variable?.value || ''));
            setOpen(false);
        },
    });

    const noneOptionLabel = finalColumn.noneOptionLabel || t('Select an option');

    const selectedLabel = useMemo(() => {
        const targetValue = String(value || '');
        if (!targetValue) {
            return noneOptionLabel;
        }

        let label = '';

        const visit = (items: VariableOption[] = []) => {
            items.forEach((item) => {
                if (label || !item || typeof item !== 'object') {
                    return;
                }

                if (String(item.value || '') === targetValue) {
                    label = item.label || targetValue;
                    return;
                }

                if (Array.isArray(item.children)) {
                    visit(item.children);
                }
            });
        };

        Object.values(finalColumn.variableCategories || {}).forEach((items) => {
            if (Array.isArray(items)) {
                visit(items);
            }
        });

        return label || targetValue;
    }, [finalColumn.variableCategories, noneOptionLabel, value]);

    const pickerGroups = useMemo(() => {
        const groups: VariableGroup[] = Array.isArray(picker.groups) ? picker.groups : [];
        const groupedByPage: VariableGroup[] = [];

        groups.forEach((group) => {
            if (group?.value !== 'fieldsVariables' || !Array.isArray(group.items)) {
                groupedByPage.push(group);
                return;
            }

            const pageBuckets = new Map<string, VariableOption[]>();
            group.items.forEach((item) => {
                const pageLabel = String(item?.pageLabel || '').trim() || t('Fields');
                if (!pageBuckets.has(pageLabel)) {
                    pageBuckets.set(pageLabel, []);
                }
                const bucket = pageBuckets.get(pageLabel);
                if (bucket) {
                    bucket.push(item);
                }
            });

            pageBuckets.forEach((items, pageLabel) => {
                groupedByPage.push({
                    label: pageLabel,
                    value: `fieldsVariables:${pageLabel}`,
                    items,
                });
            });
        });

        if (picker.page) {
            return groupedByPage;
        }

        return [{
            label: '',
            value: 'none',
            items: [{ label: noneOptionLabel, value: '__none__' }],
        }, ...groupedByPage];
    }, [noneOptionLabel, picker.groups, picker.page, t]);

    return (
        <div className="flex items-center gap-1 px-2">
            <Popover modal={false} open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    nativeButton={true}
                    render={(
                        <Button
                            size="sm"
                            variant="default"
                            className={cn(
                                'min-w-0 flex-1 py-[6px] justify-between',
                                isInvalid && 'border-error',
                                finalColumn.className,
                            )}
                        >
                            <span className="truncate flex-1 text-left">{selectedLabel}</span>
                            <FontAwesomeIcon icon={faChevronDown} className="size-2.5 pointer-events-none ml-2 shrink-0" />
                        </Button>
                    )}
                />
                <PopoverContent
                    align="start"
                    side="bottom"
                    sideOffset={6}
                    positionMethod="fixed"
                    collisionAvoidance={{
                        side: 'flip',
                        align: 'shift',
                        fallbackAxisSide: 'none',
                    }}
                    className={finalColumn.contentClassName || 'min-w-[360px] max-w-[480px] p-0 overflow-hidden flex flex-col'}
                    portalClassName="z-250"
                >
                    <VariableCommandList
                        search={picker.search}
                        onSearchChange={picker.setSearch}
                        groups={pickerGroups}
                        options={picker.options}
                        onSelect={(item, baseVariable) => {
                            if (item?.value === '__none__') {
                                updateValue('');
                                setOpen(false);
                                return;
                            }

                            picker.handleSelect(item, baseVariable);
                        }}
                        placeholder={t('Search values')}
                        showSearch
                        shouldFilter={false}
                        onBack={picker.page ? picker.handleBack : undefined}
                        isChildMode={!!picker.page}
                        selectFirstItem
                        autoFocusSearchInput={true}
                    />
                </PopoverContent>
            </Popover>

            {finalColumn.showActionsMenu !== false && (
                <DropdownMenu size="sm">
                    <DropdownMenuTrigger
                        render={(
                            <Button className="rounded-none w-7 h-7 -mr-1" variant="none" aria-label={t('More actions')} size="xs">
                                <FontAwesomeIcon icon={faEllipsis} className="size-3" />
                            </Button>
                        )}
                    />
                    <DropdownMenuContent align="end" sideOffset={8}>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => { updateValue(''); }}>
                                {noneOptionLabel}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}

export function TableCell({
    column,
    value,
    row,
    rowIndex,
    modifyColumn,
    getCellErrors,
    onUpdateCell,
}: Props) {
    const updateValue = (newValue: unknown) => {
        onUpdateCell(rowIndex, row, column, newValue);
    };

    const columnModifications = modifyColumn ? modifyColumn(row, column.name) : null;
    const finalColumn = columnModifications ? { ...column, ...columnModifications } : column;
    const cellErrorList = getCellErrors(rowIndex, finalColumn.name);
    const isInvalid = cellErrorList.length > 0;
    const { renderCell } = finalColumn;

    if (typeof renderCell === 'function') {
        return renderCell({
            column: finalColumn,
            value,
            row,
            rowIndex,
            isInvalid,
            updateValue,
            cellErrors: cellErrorList,
        });
    }

    switch (finalColumn.type) {
        case 'select':
            return (
                <div className="min-w-0 px-2">
                    <SelectInput
                        size="xs"
                        options={finalColumn.options as ComponentProps<typeof SelectInput>['options']}
                        placeholder={finalColumn.placeholder}
                        onChange={updateValue}
                        value={value || ''}
                        triggerClassName={cn('w-full max-w-full', isInvalid && 'border-error')}
                        data-editable-table-input="true"
                    />
                </div>
            );

        case 'combobox':
            return (
                <div className="px-2">
                    <ComboboxInput
                        options={finalColumn.options as ComponentProps<typeof ComboboxInput>['options']}
                        placeholder={finalColumn.placeholder}
                        value={value || null}
                        onValueChange={(nextValue) => { return updateValue(nextValue ?? ''); }}
                        className={cn(isInvalid && 'border-error', finalColumn.className)}
                        contentClassName={finalColumn.contentClassName}
                    />
                </div>
            );

        case 'variablePicker':
            return (
                <VariablePickerCell
                    finalColumn={finalColumn}
                    value={value}
                    updateValue={updateValue}
                    isInvalid={isInvalid}
                />
            );

        case 'textarea':
            return (
                <Textarea
                    value={value || ''}
                    data-editable-table-input="true"
                    onChange={(e) => { return updateValue(e.target.value); }}
                    aria-invalid={isInvalid}
                    className={cn([
                        'h-full w-full min-h-auto',
                        'border-none',
                        'rounded-none',
                        'bg-transparent',
                        'focus-visible:shadow-none',
                        'focus-visible:inset-ring-1',
                        'focus-visible:inset-ring-gray-200',
                        'aria-invalid:focus-visible:shadow-none!',
                        'aria-invalid:focus-visible:inset-ring-rose-600!',
                        isInvalid && 'inset-ring-1 inset-ring-rose-600',
                    ])}
                    rows={1}
                    placeholder={finalColumn.placeholder}
                />
            );

        case 'checkbox':
            return (
                <div className="flex items-center justify-center px-2">
                    <Checkbox
                        checked={Boolean(value)}
                        onCheckedChange={(checked) => { return updateValue(Boolean(checked)); }}
                        aria-invalid={isInvalid}
                    />
                </div>
            );

        case 'radio':
            return (
                <div className="flex items-center justify-center px-2">
                    <Checkbox
                        checked={Boolean(value)}
                        onCheckedChange={(checked) => { return updateValue(Boolean(checked)); }}
                        aria-invalid={isInvalid}
                    />
                </div>
            );

        case 'lightswitch':
            return (
                <div className="flex items-center justify-center px-2">
                    <Lightswitch
                        checked={Boolean(value)}
                        size="sm"
                        onCheckedChange={(checked) => { return updateValue(Boolean(checked)); }}
                        aria-invalid={isInvalid}
                    />
                </div>
            );

        case 'label':
            return <div className="px-2 py-2 text-sm">{value || ''}</div>;

        case 'heading':
            return <div className="px-2 py-2 text-sm font-semibold text-gray-800">{value || ''}</div>;

        case 'handle':
        case 'value':
            return (
                <Input
                    type="text"
                    value={value ?? ''}
                    data-editable-table-input="true"
                    onChange={(e) => { return updateValue(e.target.value); }}
                    aria-invalid={isInvalid}
                    className={cn([
                        'h-full w-full',
                        'relative',
                        'border-none',
                        'rounded-none',
                        'bg-transparent',
                        'font-mono text-[0.9em]',
                        'focus-visible:shadow-none',
                        'focus-visible:inset-ring-1',
                        'focus-visible:inset-ring-gray-200',
                        'aria-invalid:focus-visible:shadow-none!',
                        'aria-invalid:focus-visible:inset-ring-rose-600!',
                        isInvalid && 'inset-ring-1 inset-ring-rose-600',
                    ])}
                    placeholder={finalColumn.placeholder}
                />
            );

        case 'color':
            return (
                <ColorInput
                    value={value || ''}
                    size="sm"
                    onValueChange={(nextValue) => { return updateValue(nextValue); }}
                    isInvalid={isInvalid}
                    fitCell
                    className={cn([
                        'h-full w-full',
                        'relative',
                        'border-none',
                        'rounded-none',
                        'bg-transparent',
                        'focus-visible:shadow-none',
                        'focus-visible:inset-ring-1',
                        'focus-visible:inset-ring-gray-200',
                        'aria-invalid:focus-visible:shadow-none!',
                        'aria-invalid:focus-visible:inset-ring-rose-600!',
                        isInvalid && 'inset-ring-1 inset-ring-rose-600',
                    ])}
                    data-editable-table-input="true"
                />
            );

        case 'date':
            return (
                <DatePicker
                    value={value || null}
                    onValueChange={(nextDate) => {
                        if (!nextDate) {
                            updateValue('');
                            return;
                        }

                        const isoDate = nextDate.toISOString().split('T')[0];
                        updateValue(isoDate);
                    }}
                    placeholder={finalColumn.placeholder}
                    className={cn([
                        'h-full w-full',
                        'relative',
                        'border-none',
                        'rounded-none',
                        'bg-transparent',
                        'focus-visible:shadow-none',
                        'focus-visible:inset-ring-1',
                        'focus-visible:inset-ring-gray-200',
                        'aria-invalid:focus-visible:shadow-none!',
                        'aria-invalid:focus-visible:inset-ring-rose-600!',
                        isInvalid && 'inset-ring-1 inset-ring-rose-600',
                    ])}
                    isInvalid={isInvalid}
                />
            );

        case 'time':
            return (
                <TimePicker
                    value={value || ''}
                    onValueChange={(nextValue) => { return updateValue(nextValue || ''); }}
                    placeholder={finalColumn.placeholder}
                    className={cn([
                        'h-full w-full',
                        'relative',
                        'border-none',
                        'rounded-none',
                        'bg-transparent',
                        'focus-visible:shadow-none',
                        'focus-visible:inset-ring-1',
                        'focus-visible:inset-ring-gray-200',
                        'aria-invalid:focus-visible:shadow-none!',
                        'aria-invalid:focus-visible:inset-ring-rose-600!',
                        isInvalid && 'inset-ring-1 inset-ring-rose-600',
                    ])}
                    isInvalid={isInvalid}
                />
            );

        case 'email':
        case 'number':
        case 'text':
        case 'url':
        default:
            return (
                <Input
                    type={finalColumn.type || 'text'}
                    value={value || ''}
                    data-editable-table-input="true"
                    onChange={(e) => { return updateValue(e.target.value); }}
                    aria-invalid={isInvalid}
                    className={cn([
                        'h-full w-full',
                        'relative',
                        'border-none',
                        'rounded-none',
                        'bg-transparent',
                        'focus-visible:shadow-none',
                        'focus-visible:inset-ring-1',
                        'focus-visible:inset-ring-gray-200',
                        'aria-invalid:focus-visible:shadow-none!',
                        'aria-invalid:focus-visible:inset-ring-rose-600!',
                        isInvalid && 'inset-ring-1 inset-ring-rose-600',
                    ])}
                    placeholder={finalColumn.placeholder}
                />
            );
    }
}
