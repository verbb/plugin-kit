import { ReactNode } from 'react';
import { CheckboxProps } from './Checkbox.js';
export interface CheckboxInputProps extends Omit<CheckboxProps, 'children'> {
    label: ReactNode;
    description?: ReactNode;
    className?: string;
}
/**
 * Convenience facade pairing `<pk-checkbox>` with a label + optional description, mirroring the
 * `plugin-kit-react` `CheckboxInput`. Layout uses a plain wrapping `<label>` (no Tailwind) — the
 * checkbox itself is styled inside the web component's shadow root.
 */
export declare function CheckboxInput({ label, description, className, disabled, ...props }: CheckboxInputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CheckboxInput.d.ts.map