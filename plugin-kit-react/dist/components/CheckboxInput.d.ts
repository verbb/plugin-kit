import { ComponentProps, ReactNode } from 'react';
import { Checkbox } from './Checkbox';
type CheckboxInputProps = Omit<ComponentProps<typeof Checkbox>, 'className' | 'children'> & {
    label: ReactNode;
    description?: ReactNode;
    className?: string;
    checkboxClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
};
declare function CheckboxInput({ label, description, className, checkboxClassName, labelClassName, descriptionClassName, disabled, ...props }: CheckboxInputProps): import("react/jsx-runtime").JSX.Element;
export { CheckboxInput };
export type { CheckboxInputProps };
//# sourceMappingURL=CheckboxInput.d.ts.map