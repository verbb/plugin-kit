import { default as React } from 'react';
import { PkButton, PkButtonSize, PkButtonVariant } from '@verbb/plugin-kit-web/components/button/pk-button.js';
import { PkSpinnerSize, PkSpinnerTone, PkSpinnerVariant } from '@verbb/plugin-kit-web/components/spinner/pk-spinner.js';
declare const PkButtonElement: import('@lit/react').ReactWebComponent<PkButton, {
    onPkClick: string;
}>;
export type ButtonProps = React.ComponentProps<typeof PkButtonElement> & {
    variant?: PkButtonVariant;
    size?: PkButtonSize;
    /** Compact hug-the-glyph density — omit for default square icon-only hit box. */
    icon?: boolean;
    /** Craft `.menubtn` disclosure end-cap in a button group. */
    groupTrigger?: boolean;
    withCaret?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    /** Override spinner size — v1 Button `spinnerSize` (e.g. `xs` on `size="lg"`). */
    spinnerSize?: PkSpinnerSize;
    spinnerVariant?: PkSpinnerVariant;
    spinnerTone?: PkSpinnerTone;
    'data-state'?: 'hover' | 'focus-visible' | 'active';
};
/** React facade over `<pk-button>`. Behavior and styles live in the web component. */
export declare function Button({ children, variant, size, icon, groupTrigger, withCaret, loading, disabled, type, spinnerSize, spinnerVariant, spinnerTone, 'data-state': dataState, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export { PkButtonElement };
//# sourceMappingURL=Button.d.ts.map