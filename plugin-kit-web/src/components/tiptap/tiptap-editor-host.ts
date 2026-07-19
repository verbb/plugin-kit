import { Editor, type Extensions } from '@tiptap/core';
import {
    createTiptapExtensions,
    normalizeContentArray,
    valueToContent,
} from '@verbb/plugin-kit-tiptap-core';

export function serializeTiptapDocumentContent(content: unknown): string {
    return JSON.stringify(normalizeContentArray(content));
}

/** Normalize React/HTML `value` into the JSON string the editor stores and emits. */
export function serializeTiptapDocumentValue(raw: string | unknown[] | null | undefined): string {
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

export function parseTiptapDocumentValue(raw: string | unknown[] | null | undefined): unknown[] {
    if (raw == null || raw === '') {
        return [];
    }

    // React often passes a document array prop — accept it without JSON.parse.
    if (Array.isArray(raw)) {
        return raw;
    }

    if (typeof raw !== 'string') {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export type TiptapEditorHostOptions = {
    element: HTMLElement;
    extensions?: Extensions;
    content: unknown;
    editable: boolean;
    trailingCursorText?: string;
    minHeight?: string;
    onUpdate?: (content: unknown[]) => void;
};

export class TiptapEditorHost {
    editor: Editor | null = null;

    private lastEmitted: string | null = null;

    /** Skip TipTap `onUpdate` while applying controlled prop content — otherwise setContent
     * re-emits pk-change → React setValue → value prop → setContent … forever. */
    private suppressUpdateEmission = false;

    mount({
        element,
        extensions,
        content,
        editable,
        trailingCursorText = '\u2060',
        minHeight,
        onUpdate,
    }: TiptapEditorHostOptions): void {
        const doc = valueToContent(content, { trailingCursorText });

        this.editor = new Editor({
            element,
            extensions: extensions ?? createTiptapExtensions({ trailingCursorText }),
            content: doc,
            editable,
            onUpdate: ({ editor }) => {
                const normalized = normalizeContentArray(editor.getJSON().content);
                const serialized = JSON.stringify(normalized);
                this.lastEmitted = serialized;

                if (this.suppressUpdateEmission) {
                    return;
                }

                onUpdate?.(normalized);
            },
        });

        if (minHeight) {
            this.editor.view.dom.style.minHeight = minHeight;
        }
    }

    setContent(content: unknown, options: { trailingCursorText?: string; respectFocus?: boolean } = {}): void {
        if (!this.editor) {
            return;
        }

        const { trailingCursorText = '\u2060', respectFocus = true } = options;

        if (respectFocus && this.editor.isFocused) {
            return;
        }

        const doc = valueToContent(content, { trailingCursorText });
        const incoming = JSON.stringify(doc?.content ?? []);
        const current = JSON.stringify(this.editor.getJSON().content ?? []);

        if (incoming === current || incoming === this.lastEmitted) {
            return;
        }

        this.suppressUpdateEmission = true;
        try {
            this.editor.commands.setContent(doc ?? { type: 'doc', content: [] });
        } finally {
            this.suppressUpdateEmission = false;
        }
    }

    destroy(): void {
        this.editor?.destroy();
        this.editor = null;
        this.lastEmitted = null;
        this.suppressUpdateEmission = false;
    }
}
