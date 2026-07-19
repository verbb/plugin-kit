import { default as React } from 'react';
import { PkSelect, PkSelectSize } from '@verbb/plugin-kit-web/components/select/pk-select.js';
export interface SelectInputOption {
    value: unknown;
    label: string;
    disabled?: boolean;
    status?: string;
}
export interface SelectInputOptionGroup {
    group: string;
    options: SelectInputOption[];
}
export interface SelectInputProps {
    options: Array<SelectInputOption | SelectInputOptionGroup>;
    value?: unknown;
    onChange?: (value: unknown) => void;
    placeholder?: string;
    disabled?: boolean;
    isInvalid?: boolean;
    clearable?: boolean;
    size?: PkSelectSize;
    /** When `full`, stretch the select host to the available width (table cells). */
    width?: 'full';
    name?: string;
    id?: string;
    onBlur?: (event: Event) => void;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
    'aria-labelledby'?: string;
}
/**
 * Convenience facade over `<pk-select>` matching the `plugin-kit-react` `SelectInput`
 * ergonomics: an `options[]` array plus controlled `value`/`onChange`, instead of the
 * slotted `<pk-option>` children the raw `Select` facade exposes.
 *
 * `pk-select` is string-valued, so option values are stringified for the element and
 * mapped back to their original value on change.
 */
export declare const SelectInput: React.ForwardRefExoticComponent<SelectInputProps & React.RefAttributes<PkSelect>>;
//# sourceMappingURL=SelectInput.d.ts.map