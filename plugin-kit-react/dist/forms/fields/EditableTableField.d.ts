import { EditableTable } from '../../components';
import { ComponentProps } from 'react';
import { SchemaFormEngineApi } from '../engine/context';
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
export declare const EditableTableField: ({ form, field }: EditableTableFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EditableTableField.d.ts.map