import { Select } from '.';
import { default as React, ComponentProps } from 'react';
export interface Option<T = unknown> {
    value: T;
    label: string;
    disabled?: boolean;
    status?: string;
}
type OptionGroup<T = unknown> = {
    group: string;
    options: Option<T>[];
};
type SelectBaseProps = ComponentProps<typeof Select>;
interface SelectProps<T = unknown> extends Omit<SelectBaseProps, 'children' | 'value' | 'defaultValue' | 'onValueChange'> {
    options: Array<Option<T> | OptionGroup<T>>;
    placeholder?: string;
    onChange?: (value: T) => void;
    value?: T;
    isInvalid?: boolean;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    triggerClassName?: string;
    contentClassName?: string;
    alignItemWithTrigger?: boolean;
    id?: string;
    'aria-invalid'?: boolean | 'true' | 'false';
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
}
export declare const SelectInput: React.ForwardRefExoticComponent<SelectProps<unknown> & React.RefAttributes<HTMLButtonElement>>;
export default Select;
export type { SelectProps };
//# sourceMappingURL=SelectInput.d.ts.map