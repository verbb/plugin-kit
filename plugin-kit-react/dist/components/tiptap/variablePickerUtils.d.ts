import { VariableCategories, VariableOption } from './VariableDropdown';
import { VariableGroup } from './VariableCommandList';
export type VariableCategoryEntry = {
    key: string;
    label: string;
    options: VariableOption[];
};
export declare function getVariableCategoryEntries(variableCategories: VariableCategories, variableCategoryLabels?: Record<string, string>, variableCategoryOrder?: string[]): VariableCategoryEntry[];
export declare function toTopLevelGroups(entries: VariableCategoryEntry[], t: (message: string) => string): VariableGroup[];
export declare function matchesVariableQuery(item: VariableOption, normalizedQuery: string): boolean;
//# sourceMappingURL=variablePickerUtils.d.ts.map