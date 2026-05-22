type ColorInputSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export declare function ColorInput({ value, onValueChange, onBlur, className, size, fitCell, disabled, isInvalid, ...props }: {
    value?: string;
    onValueChange?: (value: string) => void;
    onBlur?: () => void;
    className?: string;
    size?: ColorInputSize;
    fitCell?: boolean;
    disabled?: boolean;
    isInvalid?: boolean;
    [x: string]: unknown;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ColorInput.d.ts.map