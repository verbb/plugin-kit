import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { Editor } from '@tiptap/core';
import {
    createTiptapExtensions,
    valueToContent,
} from '@verbb/plugin-kit-tiptap-core';

import { PkElement } from '../../base/pk-element.js';
import { createVariableTagDomNodeView } from './variable-tag-node-view.js';
import { pkTiptapContentStyles } from './pk-tiptap-content.styles.js';
import { tiptapContentProseMirrorStyles } from './tiptap.styles.js';

function serializeContent(doc: ReturnType<typeof valueToContent>): string {
    if (!doc) {
        return '[]';
    }

    if (Array.isArray(doc.content)) {
        return JSON.stringify(doc.content);
    }

    return JSON.stringify(doc);
}

/**
 * Read-only TipTap / ProseMirror renderer.
 *
 * Pass the same `value` shapes as TiptapEditor: node array, doc object, or JSON string.
 */
@customElement('pk-tiptap-content')
export class PkTiptapContent extends PkElement {
    static override styles = [pkTiptapContentStyles, tiptapContentProseMirrorStyles];

    @query('.editor-mount')
    private editorMount!: HTMLDivElement;

    private editor: Editor | null = null;

    @property({ attribute: 'value' })
    value = '';

    override disconnectedCallback(): void {
        this.editor?.destroy();
        this.editor = null;
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('value') && this.editor) {
            this.syncContent();
        }

        super.updated(changed);
    }

    override firstUpdated(): void {
        this.mountEditor();
    }

    private mountEditor(): void {
        this.editor = new Editor({
            element: this.editorMount,
            extensions: createTiptapExtensions({
                variableTagNodeView: createVariableTagDomNodeView(),
            }),
            content: valueToContent(this.value),
            editable: false,
        });
    }

    private syncContent(): void {
        if (!this.editor) {
            return;
        }

        const doc = valueToContent(this.value) ?? { type: 'doc', content: [] };
        const incoming = serializeContent(valueToContent(this.value));
        const current = serializeContent(this.editor.getJSON() as ReturnType<typeof valueToContent>);

        if (incoming === current) {
            return;
        }

        this.editor.commands.setContent(doc);
    }

    override render() {
        return html`<div class="editor-mount" part="content"></div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-tiptap-content': PkTiptapContent;
    }
}
