import React, { forwardRef } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkTextarea, type PkTextareaSize } from '@verbb/plugin-kit-web/components/textarea/pk-textarea.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkTextareaElement = createPluginKitComponent({
    tagName: 'pk-textarea',
    elementClass: PkTextarea,
    react: React,
    events: {
        // React `onChange` is live (every keystroke); native `change` is blur-commit.
        onInput: 'input',
        onChange: 'input',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

type PkTextareaElementProps = React.ComponentProps<typeof PkTextareaElement>;

/** React facade over `<pk-textarea>`. Behavior and styles live in the web component. */
export const Textarea = forwardRef<PkTextarea, PkTextareaElementProps>(function Textarea(props, ref) {
    const {
        disabled, readonly, invalid, fitCell, ...rest
    } = props;

    return (
        <PkTextareaElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(['disabled', 'readonly', 'invalid', 'fitCell'], {
                disabled, readonly, invalid, fitCell,
            })}
        />
    );
});

Textarea.displayName = 'Textarea';

export type TextareaProps = PkTextareaElementProps;
export type { PkTextareaSize };
