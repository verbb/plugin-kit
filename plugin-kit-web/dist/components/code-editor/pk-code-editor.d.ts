import { PropertyValues } from 'lit';
import { CodeEditorLanguage } from '@verbb/plugin-kit-codemirror-core';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
export declare class PkCodeEditor extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    private editorMount;
    input: HTMLInputElement;
    private readonly host;
    private hasInitializedEditor;
    private _value;
    language: CodeEditorLanguage;
    tabSize: number;
    lineNumbers: boolean;
    rows: number;
    readonly: boolean;
    invalid: boolean;
    get value(): string;
    set value(val: string | null);
    defaultValue: string | null;
    get editorView(): import('@codemirror/view').EditorView | null;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    firstUpdated(): void;
    private mountEditor;
    private remountEditor;
    private syncEditorContent;
    private emitValueChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-code-editor': PkCodeEditor;
    }
}
//# sourceMappingURL=pk-code-editor.d.ts.map