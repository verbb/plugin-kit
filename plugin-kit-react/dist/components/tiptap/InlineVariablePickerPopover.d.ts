import { VariableOption } from './VariableDropdown';
import { VariableGroup } from './VariableCommandList';
export type FilteredVariables = {
    groups: VariableGroup[];
    options: VariableOption[];
    isChildMode: boolean;
};
type InlineVariablePickerPopoverProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    position: {
        top: number;
        left: number;
    };
    isChildMode: boolean;
    query: string;
    onQueryChange: (query: string) => void;
    filteredVariables: FilteredVariables;
    onSelect: (item: VariableOption, baseVariable?: VariableOption) => void;
    onBack: () => void;
};
export declare function InlineVariablePickerPopover({ open, onOpenChange, position, isChildMode, query, onQueryChange, filteredVariables, onSelect, onBack, }: InlineVariablePickerPopoverProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=InlineVariablePickerPopover.d.ts.map