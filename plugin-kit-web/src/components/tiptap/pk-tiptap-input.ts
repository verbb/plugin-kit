import { html } from 'lit';
import { customElement, property, query, state } from '../../decorators.js';
import type { PropertyValues } from 'lit';
import {
    contentToValue,
    createTiptapInputExtensions,
    dedupeVariableOptions,
    flattenVariableOptions,
    inputValueToContent,
    type VariableOption,
} from '@verbb/plugin-kit-tiptap-core';
import { Editor } from '@tiptap/core';

import { formControlStyles } from '../../base/form-control.styles.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { MirrorValidator } from '../../validators/index.js';
import {
    createVariableTagDomNodeView,
    refreshVariableTagPresentation,
    type PkVariableTransformerRegistry,
} from './variable-tag-node-view.js';
import { pkTiptapInputStyles } from './pk-tiptap-input.styles.js';
import { tiptapInputProseMirrorStyles } from './tiptap.styles.js';

/** Category map keyed like Formie / kit v1 (`fieldsVariables`, `formVariables`, …). */
export type PkTiptapVariableCategories = Record<string, VariableOption[]>;

@customElement('pk-tiptap-input')
export class PkTiptapInput extends PkFormAssociatedElement {
    // Compact input chrome only — do not pull in editor `tiptapProseMirrorStyles`
    // (padding: 1rem) or single-line fields look massively padded.
    static override styles = [formControlStyles, pkTiptapInputStyles, tiptapInputProseMirrorStyles];

    static override get validators() {
        return [...super.validators, MirrorValidator()];
    }

    override assumeInteractionOn = ['blur', 'input'];

    @query('.editor-mount')
    private editorMount!: HTMLDivElement;

    @query('.mirror-input')
    override input!: HTMLInputElement;

    private editor: Editor | null = null;

    private lastEmitted: string | null = null;

    /** Avoid setContent → onUpdate → pk-change loops with controlled React values. */
    private suppressUpdateEmission = false;

    private _value: string | null = null;

    /**
     * Variable options used to resolve chip labels when hydrating from `{token}` strings.
     * Without this, saved field tokens fall back to UID title-casing after reload.
     */
    @property({ attribute: false })
    variableCategories: PkTiptapVariableCategories = {};

    /** Transform names displayed as badges on configured variable tags. */
    @property({ attribute: false })
    variableTransformerRegistry: PkVariableTransformerRegistry = {};

    /**
     * Formie / React configure bridge — called when a chip is activated for editing.
     * Prefer this over listening for `pk-variable-tag-configure` from React.
     */
    @property({ attribute: false })
    variableTagConfigure: ((detail: import('./variable-tag-node-view.js').PkVariableTagConfigureDetail) => void) | null = null;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    /** Flush + fill parent cell (editable tables). */
    @property({ type: Boolean, reflect: true, attribute: 'fit-cell' })
    fitCell = false;

    get value(): string {
        if (this.valueHasChanged) {
            return this._value ?? '';
        }

        return this._value ?? this.defaultValue ?? '';
    }

    @state()
    set value(val: string | null) {
        const next = val ?? '';

        if (this._value === next) {
            return;
        }

        this.valueHasChanged = true;
        this._value = next;
    }

    @property({ attribute: 'value', reflect: true })
    defaultValue: string | null = '';

    get editorInstance() {
        return this.editor;
    }

    private resolveVariableLists(): {
        topLevel: VariableOption[];
        all: VariableOption[];
    } {
        const topLevel = dedupeVariableOptions(
            Object.values(this.variableCategories ?? {}).flatMap((items) => {
                return Array.isArray(items) ? items : [];
            }),
        );

        return {
            topLevel,
            all: flattenVariableOptions(topLevel),
        };
    }

    private resolveEditorContent() {
        const { topLevel, all } = this.resolveVariableLists();
        return inputValueToContent(this.value, topLevel, all);
    }

    protected override syncFormValue(): void {
        this.setValue(this.value || '');

        if (this.input) {
            this.input.value = this.value || '';
        }
    }

    protected override resetToDefaultValue(): void {
        this.valueHasChanged = false;
        this._value = null;
        this.syncEditorContent(true);
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (typeof state === 'string') {
            this.value = state;
            this.syncEditorContent(true);
        }
    }

    override disconnectedCallback(): void {
        this.editor?.destroy();
        this.editor = null;
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('variableTransformerRegistry')) {
            refreshVariableTagPresentation(this);
        }

        if (changed.has('value') && !changed.has('defaultValue')) {
            this.syncEditorContent();
        }

        if (changed.has('defaultValue') && !this.valueHasChanged) {
            this.syncEditorContent();
        }

        // Categories often arrive with the field after first paint — re-hydrate labels.
        if (changed.has('variableCategories') && this.editor) {
            this.syncEditorContent(true);
        }

        if (changed.has('disabled') || changed.has('readonly')) {
            this.editor?.setEditable(!this.disabled && !this.readonly);
        }

        super.updated(changed);
    }

    override firstUpdated(): void {
        this.mountEditor();
        this.syncFormValue();
    }

    private mountEditor(): void {
        const content = this.resolveEditorContent();

        this.editor = new Editor({
            element: this.editorMount,
            extensions: createTiptapInputExtensions({
                variableTagNodeView: createVariableTagDomNodeView(),
            }),
            content,
            editable: !this.disabled && !this.readonly,
            onUpdate: ({ editor }) => {
                const nextValue = contentToValue(editor.getJSON().content);
                this.lastEmitted = nextValue;

                if (this.suppressUpdateEmission) {
                    return;
                }

                this.value = nextValue;

                if (this.input) {
                    this.input.value = nextValue;
                }

                this.syncFormValue();
                this.emitValueChange(nextValue);
            },
        });
    }

    private syncEditorContent(force = false): void {
        if (!this.editor) {
            return;
        }

        if (!force && !this.readonly && this.editor.isFocused) {
            return;
        }

        const nextContent = this.resolveEditorContent() ?? { type: 'doc', content: [] };
        const currentContent = this.editor.getJSON();
        // The schema supplies default chip attributes omitted by the serializer.
        // Compare normalized documents so controlled updates do not replace identical content.
        const nextDocument = this.editor.schema.nodeFromJSON(nextContent);

        if (nextDocument.eq(this.editor.state.doc)) {
            return;
        }

        // Newly available categories can update chip labels without changing the token string.
        if (!force && this.lastEmitted === this.value) {
            return;
        }

        // Converting literal reference text into chips changes document positions.
        const presentationOnly = this.editor.state.doc.content.size === nextDocument.content.size
            && contentToValue(currentContent.content) === contentToValue(nextContent.content);
        const selection = presentationOnly ? this.editor.state.selection.getBookmark() : null;

        this.suppressUpdateEmission = true;
        try {
            this.editor.chain()
                .setContent(nextContent)
                .command(({ tr }) => {
                    if (selection) {
                        // Label hydration must not move the caret or clear a selection.
                        tr.setSelection(selection.resolve(tr.doc));
                    }

                    return true;
                })
                .run();
        } finally {
            this.suppressUpdateEmission = false;
        }
    }

    private emitValueChange(value: string): void {
        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { value },
            bubbles: true,
            composed: true,
        }));
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    override render() {
        return html`
            <div class="shell" part="shell">
                <div class="editor-mount" part="editor"></div>
                <input class="mirror-input" type="text" .value=${this.value} readonly tabindex="-1" aria-hidden="true" />
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-tiptap-input': PkTiptapInput;
    }
}
