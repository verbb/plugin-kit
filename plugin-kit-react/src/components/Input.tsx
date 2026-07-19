import React, { forwardRef } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkInput, type PkInputSize } from '@verbb/plugin-kit-web/components/input/pk-input.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkInputElement = createPluginKitComponent({
    tagName: 'pk-input',
    elementClass: PkInput,
    react: React,
    events: {
        // React `onChange` is live (every keystroke); native `change` is blur-commit.
        onInput: 'input',
        onChange: 'input',
        onPkClear: 'pk-clear',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

type PkInputElementProps = React.ComponentProps<typeof PkInputElement>;

/** React facade over `<pk-input>`. Behavior and styles live in the web component. */
export const Input = forwardRef<PkInput, PkInputElementProps>(function Input(props, ref) {
    const {
        disabled, readonly, invalid, fitCell, autofocus, mono, ...rest
    } = props;

    return (
        <PkInputElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(['disabled', 'readonly', 'invalid', 'fitCell', 'autofocus', 'mono'], {
                disabled, readonly, invalid, fitCell, autofocus, mono,
            })}
        />
    );
});

Input.displayName = 'Input';

export type InputProps = PkInputElementProps;
export type { PkInputSize };
