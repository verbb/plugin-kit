import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import {
    PkSpinner,
    type PkSpinnerSize,
    type PkSpinnerTone,
    type PkSpinnerVariant,
} from '@verbb/plugin-kit-web/components/spinner/pk-spinner.js';

const PkSpinnerElement = createPluginKitComponent({
    tagName: 'pk-spinner',
    elementClass: PkSpinner,
    react: React,
});

export type SpinnerProps = React.ComponentProps<typeof PkSpinnerElement> & {
    variant?: PkSpinnerVariant;
    size?: PkSpinnerSize;
    tone?: PkSpinnerTone;
    centered?: boolean;
};

/** React facade over `<pk-spinner>`. Behavior and styles live in the web component. */
export function Spinner({
    variant = 'default',
    size = 'sm',
    tone,
    centered = false,
    ...props
}: SpinnerProps) {
    return (
        <PkSpinnerElement
            variant={variant}
            size={size}
            {...(tone ? { tone } : {})}
            {...(centered ? { centered: true } : {})}
            {...props}
        />
    );
}

export { PkSpinnerElement };
