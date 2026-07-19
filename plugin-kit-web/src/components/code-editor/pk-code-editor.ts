import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import {
    CodeMirrorHost,
    computeCodeEditorMinHeight,
    type CodeEditorLanguage,
} from '@verbb/plugin-kit-codemirror-core';

import { formControlStyles } from '../../base/form-control.styles.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { MirrorValidator } from '../../validators/index.js';
import { pkCodeEditorStyles } from './pk-code-editor.styles.js';

@customElement('pk-code-editor')
export class PkCodeEditor extends PkFormAssociatedElement {
    static override styles = [formControlStyles, pkCodeEditorStyles];

    static override get validators() {
        return [...super.validators, MirrorValidator()];
    }

    override assumeInteractionOn = ['blur', 'input'];

    @query('.editor-mount')
    private editorMount!: HTMLDivElement;

    @query('.mirror-input')
    override input!: HTMLInputElement;

    private readonly host = new CodeMirrorHost();

    private hasInitializedEditor = false;

    private _value: string | null = null;

    @property()
    language: CodeEditorLanguage = 'html';

    @property({ type: Number, attribute: 'tab-size' })
    tabSize = 4;

    @property({ type: Boolean, attribute: 'line-numbers' })
    lineNumbers = true;

    @property({ type: Number })
    rows = 12;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

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

    get editorView() {
        return this.host.view;
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
        this.syncEditorContent();
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (typeof state === 'string') {
            this.value = state;
            this.syncEditorContent();
        }
    }

    override disconnectedCallback(): void {
        this.host.destroy();
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if ((changed.has('value') && !changed.has('defaultValue')) || (changed.has('defaultValue') && !this.valueHasChanged)) {
            this.syncEditorContent();
        }

        if (changed.has('disabled') || changed.has('readonly')) {
            this.host.setEditable(!this.disabled && !this.readonly);
        }

        if (
            this.hasInitializedEditor
            && (changed.has('language') || changed.has('tabSize') || changed.has('lineNumbers') || changed.has('rows'))
        ) {
            this.remountEditor();
        }

        super.updated(changed);
    }

    override firstUpdated(): void {
        this.style.setProperty('--pk-code-editor-min-height', computeCodeEditorMinHeight(this.rows));
        this.mountEditor();
        this.hasInitializedEditor = true;
        this.syncFormValue();
    }

    private mountEditor(): void {
        this.host.mount({
            parent: this.editorMount,
            value: this.value,
            language: this.language,
            tabSize: this.tabSize,
            lineNumbers: this.lineNumbers,
            rows: this.rows,
            editable: !this.disabled && !this.readonly,
            onUpdate: (nextValue) => {
                this.value = nextValue;

                if (this.input) {
                    this.input.value = nextValue;
                }

                this.syncFormValue();
                this.emitValueChange(nextValue);
            },
            onBlur: () => {
                this.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
            },
        });
    }

    private remountEditor(): void {
        this.host.destroy();
        this.style.setProperty('--pk-code-editor-min-height', computeCodeEditorMinHeight(this.rows));
        this.mountEditor();
    }

    private syncEditorContent(): void {
        this.host.setValue(this.value);
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
        'pk-code-editor': PkCodeEditor;
    }
}
