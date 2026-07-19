import { scrollAreaPlaygroundSpec } from '../catalog/specs/scroll-area.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { scrollAreaWebSectionRenderers } from './surfaces/web/scroll-area-sections.js';

export { scrollAreaPlaygroundMeta } from '../catalog/data/meta-scroll-area.js';
export { scrollAreaPlaygroundSpec } from '../catalog/specs/scroll-area.spec.js';

export function renderScrollAreaPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(scrollAreaPlaygroundSpec, scrollAreaWebSectionRenderers, root);
}
