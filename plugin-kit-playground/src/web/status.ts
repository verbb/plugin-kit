import { statusPlaygroundSpec } from '../catalog/specs/status.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { statusWebSectionRenderers } from './surfaces/web/status-sections.js';

export { statusPlaygroundMeta, statusPlaygroundVariants } from '../catalog/data/meta-status.js';
export { statusPlaygroundSpec } from '../catalog/specs/status.spec.js';

export function renderStatusPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(statusPlaygroundSpec, statusWebSectionRenderers, root);
}
