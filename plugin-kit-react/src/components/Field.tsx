import React, { forwardRef, type ReactNode } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkField } from '@verbb/plugin-kit-web/components/field/pk-field.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkFieldElement = createPluginKitComponent({
    tagName: 'pk-field',
    elementClass: PkField,
    react: React,
});

type PkFieldElementProps = React.ComponentProps<typeof PkFieldElement>;

export type FieldProps = Omit<PkFieldElementProps, 'children'> & {
    /** Trailing header actions — rendered into `slot="header-end"`. */
    headerEnd?: ReactNode;
    children?: ReactNode;
};

/** React facade over `<pk-field>`. Behavior and styles live in the web component. */
export const Field = forwardRef<PkField, FieldProps>(function Field(props, ref) {
    const {
        required,
        translatable,
        headerEnd,
        children,
        ...rest
    } = props;

    return (
        <PkFieldElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(['required', 'translatable'], { required, translatable })}
        >
            {headerEnd ? <div slot="header-end">{headerEnd}</div> : null}
            {children}
        </PkFieldElement>
    );
});

Field.displayName = 'Field';

export { PkFieldElement };
