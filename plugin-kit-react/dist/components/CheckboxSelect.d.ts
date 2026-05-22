export declare const ALL_VALUE = "*";
export type CheckboxSelectOption = {
    label: string;
    value: string;
};
export type CheckboxSelectValue = typeof ALL_VALUE | string[];
type CheckboxSelectProps = {
    options: CheckboxSelectOption[];
    value?: CheckboxSelectValue;
    onChange?: (value: CheckboxSelectValue) => void;
    showAllOption?: boolean;
    allLabel?: string;
    disabled?: boolean;
    name?: string;
    className?: string;
};
export declare function CheckboxSelect({ options, value, onChange, showAllOption, allLabel, disabled, className, }: CheckboxSelectProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CheckboxSelect.d.ts.map