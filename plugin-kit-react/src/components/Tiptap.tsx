import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkTiptapContent } from '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-content.js';
import { PkTiptapEditor } from '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js';
import { PkTiptapInput } from '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js';
import { trueBooleanProps } from '../utils/lit-react-booleans.js';

/** React facades over the `<pk-tiptap-*>` family. Behavior and styles live in the web components. */
export const PkTiptapEditorElement = createPluginKitComponent({
    tagName: 'pk-tiptap-editor',
    elementClass: PkTiptapEditor,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onInput: 'input',
        // Native `change` is available via onPkChange / value callbacks — avoid
        // mapping `onChange` to the empty DOM Event (React callers expect the value).
        onPkVariableTagConfigure: 'pk-variable-tag-configure',
    },
});

export const PkTiptapInputElement = createPluginKitComponent({
    tagName: 'pk-tiptap-input',
    elementClass: PkTiptapInput,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onInput: 'input',
        onPkVariableTagConfigure: 'pk-variable-tag-configure',
    },
});

export const PkTiptapContentElement = createPluginKitComponent({
    tagName: 'pk-tiptap-content',
    elementClass: PkTiptapContent,
    react: React,
});

type PkTiptapEditorElementProps = React.ComponentProps<typeof PkTiptapEditorElement>;
type PkTiptapInputElementProps = React.ComponentProps<typeof PkTiptapInputElement>;

/** Document JSON string, or a TipTap node array (serialized before it hits the CE). */
export type TiptapEditorValue = string | readonly unknown[] | null | undefined;

export type TiptapEditorProps = Omit<PkTiptapEditorElementProps, 'value' | 'onChange' | 'onPkChange'> & {
    value?: TiptapEditorValue;
    /** Receives the JSON document string (same payload as `pk-change` detail.value). */
    onChange?: (value: string) => void;
    onPkChange?: PkTiptapEditorElementProps['onPkChange'];
    readOnly?: boolean;
};

export type TiptapInputProps = Omit<PkTiptapInputElementProps, 'onChange'> & {
    /** Receives the plain string value from `pk-change`. */
    onChange?: (value: string) => void;
    onPkChange?: PkTiptapInputElementProps['onPkChange'];
    readOnly?: boolean;
};

export type TiptapContentProps = React.ComponentProps<typeof PkTiptapContentElement>;

type PkChangeEvent = CustomEvent<{ value: string }>;

function serializeTiptapEditorValue(raw: TiptapEditorValue): string {
    if (raw == null) {
        return '[]';
    }

    if (typeof raw === 'string') {
        return raw;
    }

    if (Array.isArray(raw)) {
        return JSON.stringify(raw);
    }

    return '[]';
}

function readPkChangeValue(event: Event): string | undefined {
    const detail = (event as PkChangeEvent).detail;
    return typeof detail?.value === 'string' ? detail.value : undefined;
}

/**
 * TipTap editors are form-associated. Never forward `disabled={undefined}` —
 * @lit/react assigns the property, and FAE must not treat that as a toggle force.
 */
export function TiptapEditor({
    value,
    onChange,
    onPkChange,
    disabled,
    invalid,
    readonly,
    readOnly,
    ...props
}: TiptapEditorProps) {
    // Formie / React use `readOnly`; Lit property is `readonly`.
    const isReadonly = Boolean(readonly ?? readOnly);

    return (
        <PkTiptapEditorElement
            {...props}
            // Always pass a JSON string — node arrays from React otherwise mount empty.
            value={serializeTiptapEditorValue(value)}
            onPkChange={(event) => {
                onPkChange?.(event);
                const next = readPkChangeValue(event);
                if (next !== undefined) {
                    onChange?.(next);
                }
            }}
            {...trueBooleanProps(['disabled', 'invalid', 'readonly'] as const, {
                disabled,
                invalid,
                readonly: isReadonly,
            })}
        />
    );
}

export function TiptapInput({
    onChange,
    onPkChange,
    disabled,
    invalid,
    readonly,
    readOnly,
    fitCell,
    ...props
}: TiptapInputProps) {
    // Formie / React use `readOnly`; Lit property is `readonly` (chrome + editable).
    const isReadonly = Boolean(readonly ?? readOnly);

    return (
        <PkTiptapInputElement
            {...props}
            onPkChange={(event) => {
                onPkChange?.(event);
                const next = readPkChangeValue(event);
                if (next !== undefined) {
                    onChange?.(next);
                }
            }}
            {...trueBooleanProps(['disabled', 'invalid', 'readonly', 'fitCell'] as const, {
                disabled,
                invalid,
                readonly: isReadonly,
                fitCell,
            })}
        />
    );
}

export const TiptapContent = PkTiptapContentElement;
