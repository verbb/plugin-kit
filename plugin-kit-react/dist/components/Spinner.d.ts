import { default as React } from 'react';
import { PkSpinner, PkSpinnerSize, PkSpinnerTone, PkSpinnerVariant } from '@verbb/plugin-kit-web/components/spinner/pk-spinner.js';
declare const PkSpinnerElement: import('@lit/react').ReactWebComponent<PkSpinner, {}>;
export type SpinnerProps = React.ComponentProps<typeof PkSpinnerElement> & {
    variant?: PkSpinnerVariant;
    size?: PkSpinnerSize;
    tone?: PkSpinnerTone;
    centered?: boolean;
};
/** React facade over `<pk-spinner>`. Behavior and styles live in the web component. */
export declare function Spinner({ variant, size, tone, centered, ...props }: SpinnerProps): import("react/jsx-runtime").JSX.Element;
export { PkSpinnerElement };
//# sourceMappingURL=Spinner.d.ts.map