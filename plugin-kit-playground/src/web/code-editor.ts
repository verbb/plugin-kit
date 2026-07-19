import { codeEditorPlaygroundSpec } from '../catalog/specs/code-editor.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { codeEditorWebSectionRenderers } from './surfaces/web/code-editor-sections.js';

export { codeEditorPlaygroundMeta } from '../catalog/data/meta-code-editor.js';
export { codeEditorPlaygroundSpec } from '../catalog/specs/code-editor.spec.js';

export function renderCodeEditorPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(codeEditorPlaygroundSpec, codeEditorWebSectionRenderers, root);
}
