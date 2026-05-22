import { VariableOption, VariableCategories } from './VariableDropdown';
import { VariableGroup } from './VariableCommandList';
export type UseVariablePickerOptions = {
    variableCategories: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    /** Called when a leaf variable is selected. defaultIfEmpty is optional (e.g. "Guest" for {user:firstName|Guest}). */
    onApply: (baseVariable: VariableOption, variable: VariableOption, defaultIfEmpty?: string) => void;
    /** When true, reset pages and search (e.g. when picker opens) */
    isOpen?: boolean;
    /** When opening for edit, start on this child page instead of top level */
    initialPage?: VariableOption | null;
    /** Optional: return current "default if empty" value when a variable is applied */
    getDefaultIfEmpty?: () => string;
    /** Defers expensive top-level group building until the picker is opened. */
    deferUntilOpen?: boolean;
};
export declare function useVariablePicker({ variableCategories, variableCategoryLabels, variableCategoryOrder, onApply, isOpen, initialPage, getDefaultIfEmpty, deferUntilOpen, }: UseVariablePickerOptions): {
    groups: VariableGroup[];
    options: VariableOption[];
    search: string;
    setSearch: import('react').Dispatch<import('react').SetStateAction<string>>;
    page: VariableOption | undefined;
    handleSelect: (variable: VariableOption, baseVariableOpt?: VariableOption) => void;
    handleBack: () => void;
    reset: () => void;
};
//# sourceMappingURL=useVariablePicker.d.ts.map