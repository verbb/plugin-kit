import { default as React } from 'react';
import { PkCheckbox } from '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
declare const PkCheckboxElement: import('@lit/react').ReactWebComponent<PkCheckbox, {
    onPkChange: string;
    onChange: string;
}>;
export type CheckboxProps = Omit<React.ComponentProps<typeof PkCheckboxElement>, 'checkboxValue'> & {
    /** Controlled checked state. Omit for uncontrolled. */
    checked?: boolean;
    /**
     * Initial checked state when uncontrolled.
     * Mapped to `checked` on first paint — `pk-checkbox` only reads `default-checked` on form reset.
     */
    defaultChecked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    'data-state'?: 'focus-visible';
    /** Controlled checked updates — unwraps `pk-change` `detail.checked`. */
    onCheckedChange?: (checked: boolean) => void;
};
/** React facade over `<pk-checkbox>`. Behavior and styles live in the web component. */
export declare function Checkbox({ children, checked, defaultChecked, indeterminate, disabled, invalid, required, value, 'data-state': dataState, onCheckedChange, onPkChange, ...props }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
export { PkCheckboxElement };
//# sourceMappingURL=Checkbox.d.ts.map