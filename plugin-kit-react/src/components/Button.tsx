import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkButton, type PkButtonSize, type PkButtonVariant } from '@verbb/plugin-kit-web/components/button/pk-button.js';
import type { PkSpinnerSize, PkSpinnerTone, PkSpinnerVariant } from '@verbb/plugin-kit-web/components/spinner/pk-spinner.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkButtonElement = createPluginKitComponent({
    tagName: 'pk-button',
    elementClass: PkButton,
    react: React,
    events: {
        onPkClick: 'click',
    },
});

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
export function Button({
    children,
    variant = 'default',
    size = 'default',
    icon,
    groupTrigger,
    withCaret,
    loading = false,
    disabled = false,
    type = 'button',
    spinnerSize,
    spinnerVariant,
    spinnerTone,
    'data-state': dataState,
    ...props
}: ButtonProps) {
    return (
        <PkButtonElement
            variant={variant}
            size={size}
            loading={loading}
            disabled={disabled}
            type={type}
            {...trueBooleanProps(['icon', 'groupTrigger', 'withCaret'], { icon, groupTrigger, withCaret })}
            {...(spinnerSize ? { 'spinner-size': spinnerSize } : {})}
            {...(spinnerVariant ? { 'spinner-variant': spinnerVariant } : {})}
            {...(spinnerTone ? { 'spinner-tone': spinnerTone } : {})}
            {...(dataState ? { 'data-state': dataState } : {})}
            {...props}
        >
            {children}
        </PkButtonElement>
    );
}

export { PkButtonElement };
