import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
import { PkVariableTransformerRegistry } from './variable-tag-node-view.js';
/**
 * Read-only TipTap / ProseMirror renderer.
 *
 * Pass the same `value` shapes as TiptapEditor: node array, doc object, or JSON string.
 */
export declare class PkTiptapContent extends PkElement {
    static styles: import('lit').CSSResult[];
    private editorMount;
    private editor;
    value: string;
    /** Transform names displayed as badges on configured variable tags. */
    variableTransformerRegistry: PkVariableTransformerRegistry;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    firstUpdated(): void;
    private mountEditor;
    private syncContent;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-tiptap-content': PkTiptapContent;
    }
}
//# sourceMappingURL=pk-tiptap-content.d.ts.map