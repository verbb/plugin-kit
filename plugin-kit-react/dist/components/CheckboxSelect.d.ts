import { default as React } from 'react';
import { PkCheckboxSelect, PkCheckboxSelectOption, PkCheckboxSelectValue } from '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
declare const PkCheckboxSelectElement: import('@lit/react').ReactWebComponent<PkCheckboxSelect, {
    onPkChange: string;
    onNativeChange: string;
}>;
type PkCheckboxSelectElementProps = React.ComponentProps<typeof PkCheckboxSelectElement>;
export type CheckboxSelectProps = Omit<PkCheckboxSelectElementProps, 'onChange'> & {
    /**
     * Controlled value callback — sugar over `onPkChange` detail.
     * Prefer this in React apps; `onPkChange` remains for CE parity.
     */
    onChange?: (value: PkCheckboxSelectValue) => void;
};
/** React facade over `<pk-checkbox-select>`. Behavior and styles live in the web component. */
export declare const CheckboxSelect: React.ForwardRefExoticComponent<Omit<CheckboxSelectProps, "ref"> & React.RefAttributes<PkCheckboxSelect>>;
export { PkCheckboxSelectElement };
export { ALL_VALUE } from '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
export type { PkCheckboxSelectOption, PkCheckboxSelectValue };
//# sourceMappingURL=CheckboxSelect.d.ts.map