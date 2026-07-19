import { tiptapEditorPlaygroundSpec } from '../catalog/specs/tiptap-editor.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { tiptapEditorWebSectionRenderers } from './surfaces/web/tiptap-editor-sections.js';

export { tiptapEditorPlaygroundMeta } from '../catalog/data/meta-tiptap-editor.js';
export { tiptapEditorPlaygroundSpec } from '../catalog/specs/tiptap-editor.spec.js';

export function renderTiptapEditorPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(tiptapEditorPlaygroundSpec, tiptapEditorWebSectionRenderers, root);
}
