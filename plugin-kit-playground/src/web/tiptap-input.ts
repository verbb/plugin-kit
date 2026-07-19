import { tiptapInputPlaygroundSpec } from '../catalog/specs/tiptap-input.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { tiptapInputWebSectionRenderers } from './surfaces/web/tiptap-input-sections.js';

export { tiptapInputPlaygroundSpec } from '../catalog/specs/tiptap-input.spec.js';

export function renderTiptapInputPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(tiptapInputPlaygroundSpec, tiptapInputWebSectionRenderers, root);
}
