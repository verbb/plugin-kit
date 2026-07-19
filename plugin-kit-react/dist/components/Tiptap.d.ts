import { default as React } from 'react';
import { PkTiptapContent } from '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-content.js';
import { PkTiptapEditor } from '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js';
import { PkTiptapInput } from '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js';
/** React facades over the `<pk-tiptap-*>` family. Behavior and styles live in the web components. */
export declare const PkTiptapEditorElement: import('@lit/react').ReactWebComponent<PkTiptapEditor, {
    onPkChange: string;
    onInput: string;
    onPkVariableTagConfigure: string;
}>;
export declare const PkTiptapInputElement: import('@lit/react').ReactWebComponent<PkTiptapInput, {
    onPkChange: string;
    onInput: string;
    onPkVariableTagConfigure: string;
}>;
export declare const PkTiptapContentElement: import('@lit/react').ReactWebComponent<PkTiptapContent, {}>;
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
/**
 * TipTap editors are form-associated. Never forward `disabled={undefined}` —
 * @lit/react assigns the property, and FAE must not treat that as a toggle force.
 */
export declare function TiptapEditor({ value, onChange, onPkChange, disabled, invalid, readonly, readOnly, ...props }: TiptapEditorProps): import("react/jsx-runtime").JSX.Element;
export declare function TiptapInput({ onChange, onPkChange, disabled, invalid, readonly, readOnly, fitCell, ...props }: TiptapInputProps): import("react/jsx-runtime").JSX.Element;
export declare const TiptapContent: import('@lit/react').ReactWebComponent<PkTiptapContent, {}>;
export {};
//# sourceMappingURL=Tiptap.d.ts.map