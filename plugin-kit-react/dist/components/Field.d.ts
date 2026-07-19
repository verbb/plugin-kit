import { default as React, ReactNode } from 'react';
import { PkField } from '@verbb/plugin-kit-web/components/field/pk-field.js';
declare const PkFieldElement: import('@lit/react').ReactWebComponent<PkField, {}>;
type PkFieldElementProps = React.ComponentProps<typeof PkFieldElement>;
export type FieldProps = Omit<PkFieldElementProps, 'children'> & {
    /** Trailing header actions — rendered into `slot="header-end"`. */
    headerEnd?: ReactNode;
    children?: ReactNode;
};
/** React facade over `<pk-field>`. Behavior and styles live in the web component. */
export declare const Field: React.ForwardRefExoticComponent<Omit<FieldProps, "ref"> & React.RefAttributes<PkField>>;
export { PkFieldElement };
//# sourceMappingURL=Field.d.ts.map