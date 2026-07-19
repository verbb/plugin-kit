import React, { forwardRef } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkCodeEditor } from '@verbb/plugin-kit-web/components/code-editor/pk-code-editor.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkCodeEditorElement = createPluginKitComponent({
    tagName: 'pk-code-editor',
    elementClass: PkCodeEditor,
    react: React,
    events: {
        onPkChange: 'pk-change',
        // React `onChange` is live; native `change` is blur-commit.
        onInput: 'input',
        onChange: 'input',
        onBlur: 'blur',
    },
});

type PkCodeEditorElementProps = React.ComponentProps<typeof PkCodeEditorElement>;

export type CodeEditorProps = PkCodeEditorElementProps & {
    /** React alias for the CE `invalid` boolean attribute. */
    isInvalid?: boolean;
    /** React/Formie alias for the Lit `readonly` property. */
    readOnly?: boolean;
};

/** React facade over `<pk-code-editor>`. Behavior and styles live in the web component. */
export const CodeEditor = forwardRef<PkCodeEditor, CodeEditorProps>(function CodeEditor(
    {
        disabled,
        readonly,
        readOnly,
        invalid,
        isInvalid,
        ...rest
    },
    ref,
) {
    // Docs / Formie use `isInvalid` + `readOnly`; Lit properties are `invalid` + `readonly`.
    const resolvedInvalid = Boolean(invalid ?? isInvalid);
    const resolvedReadonly = Boolean(readonly ?? readOnly);

    return (
        <PkCodeEditorElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(['disabled', 'readonly', 'invalid'], {
                disabled,
                readonly: resolvedReadonly,
                invalid: resolvedInvalid,
            })}
        />
    );
});

CodeEditor.displayName = 'CodeEditor';

export { PkCodeEditorElement };
