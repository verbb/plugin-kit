export type VariableOption = {
    label: string;
    value: string;
    children?: VariableOption[];
    /** For child items: selector | format | value. */
    type?: string;
    [key: string]: unknown;
};
export type VariableCategories = Record<string, VariableOption[]>;
//# sourceMappingURL=variable-option.d.ts.map