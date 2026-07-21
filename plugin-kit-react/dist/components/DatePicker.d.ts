import { default as React } from 'react';
import { PkDatePicker, PkDatePickerMode, PkDatePickerSize } from '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js';
declare const PkDatePickerElement: import('@lit/react').ReactWebComponent<PkDatePicker, {
    onPkChange: string;
    onPkClear: string;
    onInput: string;
    onChange: string;
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
}>;
type PkDatePickerElementProps = React.ComponentProps<typeof PkDatePickerElement>;
export type DatePickerProps = Omit<PkDatePickerElementProps, 'value' | 'onPkChange'> & {
    /** ISO string, Date, or empty — v1 DatePicker accepted Date. */
    value?: string | Date | null;
    /** React/Formie alias for the CE `invalid` boolean. */
    isInvalid?: boolean;
    /**
     * v1 callback — receives a local `Date` (or `undefined` when cleared).
     * Prefer `onPkChange` for raw ISO `detail.value` from the CE.
     */
    onValueChange?: (value: Date | undefined) => void;
    onPkChange?: PkDatePickerElementProps['onPkChange'];
    /** Sugar for the CE `with-clear` toggle. */
    clearable?: boolean;
    /** Sugar for the CE `mode="multiple"` (multi-date selection). Explicit `mode` wins. */
    multiple?: boolean;
};
/** React facade over `<pk-date-picker>`. Behavior and styles live in the web component. */
export declare const DatePicker: React.ForwardRefExoticComponent<Omit<DatePickerProps, "ref"> & React.RefAttributes<PkDatePicker>>;
export { PkDatePickerElement };
export type { PkDatePickerMode, PkDatePickerSize };
//# sourceMappingURL=DatePicker.d.ts.map