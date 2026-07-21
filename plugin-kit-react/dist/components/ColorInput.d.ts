import { default as React } from 'react';
import { PkColorInput, PkColorInputSize } from '@verbb/plugin-kit-web/components/color-input/pk-color-input.js';
declare const PkColorInputElement: import('@lit/react').ReactWebComponent<PkColorInput, {
    onPkChange: string;
    onInput: string;
    onNativeChange: string;
    onBlur: string;
}>;
type PkColorInputElementProps = React.ComponentProps<typeof PkColorInputElement>;
export type ColorInputProps = Omit<PkColorInputElementProps, 'onChange'> & {
    /** React alias for the CE `invalid` boolean attribute. */
    isInvalid?: boolean;
    /** CE `readonly` boolean. Declared explicitly so it survives lit-react's prop mapping. */
    readonly?: boolean;
    /** React/Formie alias for the Lit `readonly` property. */
    readOnly?: boolean;
    /**
     * Controlled value callback — sugar over `onPkChange` detail.
     * Also accepts legacy docs name `onValueChange`.
     */
    onChange?: (value: string) => void;
    /** @deprecated Prefer `onChange` — kept for docs examples that still use this name. */
    onValueChange?: (value: string) => void;
};
/** React facade over `<pk-color-input>`. Behavior and styles live in the web component. */
export declare const ColorInput: React.ForwardRefExoticComponent<Omit<ColorInputProps, "ref"> & React.RefAttributes<PkColorInput>>;
export { PkColorInputElement };
export type { PkColorInputSize };
//# sourceMappingURL=ColorInput.d.ts.map