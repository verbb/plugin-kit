import { useMemo } from 'react';
import { EditableTable } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

type StaticTableOption = {
    label?: string;
    value?: unknown;
    [key: string]: unknown;
};

type StaticTableColumn = {
    name?: string;
    type?: string;
    label?: string;
    heading?: string;
    class?: string;
    required?: boolean;
    options?: StaticTableOption[];
    placeholder?: string;
    thin?: boolean;
    [key: string]: unknown;
};

type StaticTableRowValue = Record<string, unknown>;

const normalizeColumnsConfig = (columnsConfig: StaticTableColumn[] | Record<string, StaticTableColumn> | undefined) => {
    if (Array.isArray(columnsConfig)) {
        return columnsConfig;
    }

    if (!columnsConfig || typeof columnsConfig !== 'object') {
        return [];
    }

    return Object.entries(columnsConfig).map(([key, value]) => {
        const config = (value && typeof value === 'object') ? value : {} as StaticTableColumn;

        return {
            name: config.name || key,
            ...config,
        } as StaticTableColumn;
    });
};

const normalizeRowsConfig = (
    rowsConfig: StaticTableRowValue[] | Record<string, StaticTableRowValue> | undefined,
) => {
    if (Array.isArray(rowsConfig)) {
        return rowsConfig;
    }

    if (!rowsConfig || typeof rowsConfig !== 'object') {
        return [];
    }

    return Object.entries(rowsConfig).map(([key, value]) => {
        const row = (value && typeof value === 'object') ? value : {};

        return {
            key,
            ...row,
        };
    });
};

type StaticTableFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        columns?: StaticTableColumn[] | Record<string, StaticTableColumn>;
        rows?: StaticTableRowValue[] | Record<string, StaticTableRowValue>;
    };
};

type StaticTableRowConfig = StaticTableRowValue & {
    key?: string;
    name?: string;
    __staticRowKey?: string;
    __staticRowIndex?: number;
};

const mapColumns = (columns: StaticTableColumn[]) => {
    return (columns || []).map((config, index) => {
        const className = String(config?.class || '');
        const columnName = config?.name || `col${index + 1}`;
        const type = config?.type === 'fieldSelect' ? 'select' : (config?.type || 'text');
        const isThin = Boolean(config?.thin || className.includes('thin'));

        return {
            name: columnName,
            label: config?.label ?? config?.heading ?? columnName,
            type,
            required: Boolean(config?.required),
            options: config?.options,
            placeholder: config?.placeholder,
            thin: isThin,
            className,
        };
    });
};

const mapRowsToArray = (
    rowEntries: StaticTableRowConfig[],
    columns: Array<{ name: string; type?: string }>,
    fieldValue: Record<string, unknown> | null | undefined,
) => {
    const editableColumnNames = columns
        .filter((column) => { return !['heading', 'label'].includes(column.type || ''); })
        .map((column) => { return column.name; });

    return rowEntries.map((defaultRow, index) => {
        const rowKey = String(defaultRow?.key || defaultRow?.name || `row${index + 1}`);
        const savedRow = fieldValue?.[rowKey];
        const savedRowData = (savedRow && typeof savedRow === 'object') ? savedRow as StaticTableRowValue : {};

        const normalizedRow: StaticTableRowConfig = {
            ...defaultRow,
            ...savedRowData,
            __staticRowKey: rowKey,
            __staticRowIndex: index,
        };

        if (editableColumnNames.length === 1 && typeof savedRow !== 'object') {
            normalizedRow[editableColumnNames[0]] = savedRow ?? '';
        }

        return normalizedRow;
    });
};

export const StaticTableField = ({ form, field }: StaticTableFieldProps) => {
    const {
        value, setValue, setTouched, errors,
    } = useEngineField(form, field.name);
    const rowEntries = useMemo(() => {
        return normalizeRowsConfig(field.rows) as StaticTableRowConfig[];
    }, [field.rows]);

    const columns = useMemo(() => {
        return mapColumns(normalizeColumnsConfig(field.columns));
    }, [field.columns]);

    const rows = useMemo(() => {
        return mapRowsToArray(rowEntries, columns, value as Record<string, unknown> | null | undefined);
    }, [columns, rowEntries, value]);

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
            withControl={false}
        >
            <EditableTable
                columns={columns}
                rows={rows}
                onChange={(nextRows) => {
                    const nextValue: Record<string, unknown> = {};
                    const editableColumns = columns.filter((column) => {
                        return !['heading', 'label'].includes(column.type || '');
                    });

                    nextRows.forEach((row, index) => {
                        const fallbackKey = String(rowEntries[index]?.key || rowEntries[index]?.name || `row${index + 1}`);
                        const rowKey = row.__staticRowKey || fallbackKey;

                        if (editableColumns.length === 1) {
                            const columnName = editableColumns[0].name;
                            nextValue[rowKey] = row[columnName] ?? '';
                            return;
                        }

                        const normalizedRow: Record<string, unknown> = {};
                        editableColumns.forEach((column) => {
                            normalizedRow[column.name] = row[column.name] ?? '';
                        });
                        nextValue[rowKey] = normalizedRow;
                    });

                    setValue(nextValue);
                    setTouched();
                }}
                allowAdd={false}
                allowDelete={false}
                allowReorder={false}
                className=""
                onCellChange={undefined}
                modifyColumn={undefined}
                fieldName={undefined}
                cellErrors={{}}
            />
        </FieldLayout>
    );
};
