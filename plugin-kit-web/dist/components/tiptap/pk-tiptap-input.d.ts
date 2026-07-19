import { PropertyValues } from 'lit';
import { VariableOption } from '@verbb/plugin-kit-tiptap-core';
import { Editor } from '@tiptap/core';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
/** Category map keyed like Formie / kit v1 (`fieldsVariables`, `formVariables`, …). */
export type PkTiptapVariableCategories = Record<string, VariableOption[]>;
export declare class PkTiptapInput extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    private editorMount;
    input: HTMLInputElement;
    private editor;
    private lastEmitted;
    /** Avoid setContent → onUpdate → pk-change loops with controlled React values. */
    private suppressUpdateEmission;
    private _value;
    /**
     * Variable options used to resolve chip labels when hydrating from `{token}` strings.
     * Without this, saved field tokens fall back to UID title-casing after reload.
     */
    variableCategories: PkTiptapVariableCategories;
    /**
     * Formie / React configure bridge — called when a chip is activated for editing.
     * Prefer this over listening for `pk-variable-tag-configure` from React.
     */
    variableTagConfigure: ((detail: import('./variable-tag-node-view.js').PkVariableTagConfigureDetail) => void) | null;
    readonly: boolean;
    invalid: boolean;
    /** Flush + fill parent cell (editable tables). */
    fitCell: boolean;
    get value(): string;
    set value(val: string | null);
    defaultValue: string | null;
    get editorInstance(): Editor | null;
    private resolveVariableLists;
    private resolveEditorContent;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    firstUpdated(): void;
    private mountEditor;
    private syncEditorContent;
    private emitValueChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-tiptap-input': PkTiptapInput;
    }
}
//# sourceMappingURL=pk-tiptap-input.d.ts.map