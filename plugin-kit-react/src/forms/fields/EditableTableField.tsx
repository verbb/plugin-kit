import { EditableTable } from '@verbb/plugin-kit-react/components';
import type { ComponentProps } from 'react';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEditableTableFieldBinding } from '../useEditableTableFieldBinding';

type EditableTableFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        columns: ComponentProps<typeof EditableTable>['columns'];
        addRowLabel?: string;
        allowReorder?: boolean;
        allowAdd?: boolean;
        allowDelete?: boolean;
        newRowDefaults?: Record<string, unknown>;
    };
};

export const EditableTableField = ({ form, field }: EditableTableFieldProps) => {
    const {
        rows,
        setRows,
        errors,
        cellErrors,
        handleCellChange,
    } = useEditableTableFieldBinding(form, field.name);

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
                columns={field.columns}
                rows={rows}
                onChange={setRows}
                onCellChange={handleCellChange}
                addRowLabel={field.addRowLabel}
                allowReorder={field.allowReorder}
                allowAdd={field.allowAdd}
                allowDelete={field.allowDelete}
                newRowDefaults={field.newRowDefaults}
                className=""
                fieldName={field.name}
                cellErrors={cellErrors}
                modifyColumn={undefined}
            />
        </FieldLayout>
    );
};
