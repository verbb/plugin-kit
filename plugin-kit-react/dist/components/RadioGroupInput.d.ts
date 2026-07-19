import { default as React } from 'react';
import { RadioGroupProps } from './RadioGroup.js';
export interface RadioGroupInputOption {
    value: unknown;
    label: React.ReactNode;
    disabled?: boolean;
}
export interface RadioGroupInputProps extends Omit<RadioGroupProps, 'children' | 'onChange' | 'onPkChange' | 'value'> {
    options: RadioGroupInputOption[];
    value?: unknown;
    onChange?: (value: unknown) => void;
    onPkChange?: RadioGroupProps['onPkChange'];
}
/**
 * Convenience facade over `<pk-radio-group>` with an `options[]` array plus controlled
 * `value`/`onChange`, instead of slotted `<pk-radio>` children the raw `RadioGroup` exposes.
 */
export declare function RadioGroupInput({ options, value, onChange, onPkChange, ...props }: RadioGroupInputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RadioGroupInput.d.ts.map