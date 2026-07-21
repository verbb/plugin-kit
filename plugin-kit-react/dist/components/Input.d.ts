import { default as React } from 'react';
import { PkInput, PkInputSize } from '@verbb/plugin-kit-web/components/input/pk-input.js';
declare const PkInputElement: import('@lit/react').ReactWebComponent<PkInput, {
    onInput: string;
    onChange: string;
    onPkClear: string;
    onFocus: string;
    onBlur: string;
}>;
type PkInputElementProps = React.ComponentProps<typeof PkInputElement>;
export type InputProps = PkInputElementProps & {
    autofocus?: boolean;
};
/** React facade over `<pk-input>`. Behavior and styles live in the web component. */
export declare const Input: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<PkInput>>;
export type { PkInputSize };
//# sourceMappingURL=Input.d.ts.map