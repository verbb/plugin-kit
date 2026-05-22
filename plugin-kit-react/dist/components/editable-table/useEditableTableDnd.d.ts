import { EditableTableRow } from './types';
export declare const useEditableTableDnd: ({ allowReorder, internalData, handleChange, }: {
    allowReorder: boolean;
    internalData: EditableTableRow[];
    handleChange: (rows: EditableTableRow[]) => void;
}) => {
    isDragging: boolean;
    isDndHydrated: boolean;
    effectiveAllowReorder: boolean;
    handleDragStart: () => void;
    handleDragEnd: (event: {
        canceled?: boolean;
        operation?: {
            source?: unknown;
        };
    }) => void;
};
//# sourceMappingURL=useEditableTableDnd.d.ts.map