import React, { forwardRef, useCallback } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkColorInput, type PkColorInputSize } from '@verbb/plugin-kit-web/components/color-input/pk-color-input.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkColorInputElement = createPluginKitComponent({
    tagName: 'pk-color-input',
    elementClass: PkColorInput,
    react: React,
    events: {
        onPkChange: 'pk-change',
        // React `onChange` is live; native `change` is blur-commit.
        onInput: 'input',
        onNativeChange: 'change',
        onBlur: 'blur',
    },
});

type PkColorInputElementProps = React.ComponentProps<typeof PkColorInputElement>;

export type ColorInputProps = Omit<PkColorInputElementProps, 'onChange'> & {
    /** React alias for the CE `invalid` boolean attribute. */
    isInvalid?: boolean;
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
export const ColorInput = forwardRef<PkColorInput, ColorInputProps>(function ColorInput(
    {
        disabled,
        readonly,
        readOnly,
        invalid,
        isInvalid,
        onChange,
        onValueChange,
        onPkChange,
        ...rest
    },
    ref,
) {
    // Docs / Formie use `isInvalid` + `readOnly`; Lit properties are `invalid` + `readonly`.
    const resolvedInvalid = Boolean(invalid ?? isInvalid);
    const resolvedReadonly = Boolean(readonly ?? readOnly);
    const valueCallback = onChange ?? onValueChange;

    const handlePkChange = useCallback(
        (event: Event) => {
            onPkChange?.(event as Parameters<NonNullable<PkColorInputElementProps['onPkChange']>>[0]);

            if (!valueCallback) {
                return;
            }

            const detail = (event as CustomEvent<{ value?: string }>).detail;
            if (detail && 'value' in detail) {
                valueCallback(detail.value ?? '');
            }
        },
        [onPkChange, valueCallback],
    );

    return (
        <PkColorInputElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(['disabled', 'readonly', 'invalid'], {
                disabled,
                readonly: resolvedReadonly,
                invalid: resolvedInvalid,
            })}
            {...(valueCallback || onPkChange ? { onPkChange: handlePkChange } : {})}
        />
    );
});

ColorInput.displayName = 'ColorInput';

export { PkColorInputElement };
export type { PkColorInputSize };
