import { Compartment, EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

import { computeCodeEditorMinHeight, type CodeEditorLanguage } from './constants.js';
import { createCodeEditorExtensions } from './extensions.js';

export type CodeMirrorHostMountOptions = {
    parent: HTMLElement;
    value?: string;
    language?: CodeEditorLanguage;
    tabSize?: number;
    lineNumbers?: boolean;
    rows?: number;
    editable?: boolean;
    onUpdate?: (value: string) => void;
    onBlur?: () => void;
};

export class CodeMirrorHost {
    view: EditorView | null = null;

    private readonly editableCompartment = new Compartment();

    private lastEmitted: string | null = null;

    mount({
        parent,
        value = '',
        language = 'html',
        tabSize = 4,
        lineNumbers = true,
        rows = 12,
        editable = true,
        onUpdate,
        onBlur,
    }: CodeMirrorHostMountOptions): void {
        this.view = new EditorView({
            state: EditorState.create({
                doc: value,
                extensions: createCodeEditorExtensions({
                    language,
                    tabSize,
                    lineNumbers,
                    editable,
                    editableCompartment: this.editableCompartment,
                    onUpdate: (nextValue) => {
                        this.lastEmitted = nextValue;
                        onUpdate?.(nextValue);
                    },
                    onBlur,
                }),
            }),
            parent,
        });

        this.view.dom.style.minHeight = computeCodeEditorMinHeight(rows);
        this.view.dom.style.width = '100%';
    }

    getValue(): string {
        return this.view?.state.doc.toString() ?? '';
    }

    setValue(value: string, options: { respectFocus?: boolean } = {}): void {
        if (!this.view) {
            return;
        }

        const { respectFocus = true } = options;

        if (respectFocus && this.view.hasFocus) {
            return;
        }

        const current = this.view.state.doc.toString();

        if (current === value || value === this.lastEmitted) {
            return;
        }

        this.view.dispatch({
            changes: {
                from: 0,
                to: this.view.state.doc.length,
                insert: value,
            },
        });
    }

    setEditable(editable: boolean): void {
        if (!this.view) {
            return;
        }

        this.view.dispatch({
            effects: this.editableCompartment.reconfigure(EditorView.editable.of(editable)),
        });
    }

    destroy(): void {
        this.view?.destroy();
        this.view = null;
        this.lastEmitted = null;
    }
}
