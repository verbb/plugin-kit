import { separatorPlaygroundSpec } from '../catalog/specs/separator.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { separatorWebSectionRenderers } from './surfaces/web/separator-sections.js';

export { separatorPlaygroundMeta, separatorPlaygroundSections } from '../catalog/data/meta-separator.js';
export { separatorPlaygroundSpec } from '../catalog/specs/separator.spec.js';

export function renderSeparatorPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(separatorPlaygroundSpec, separatorWebSectionRenderers, root);
}
