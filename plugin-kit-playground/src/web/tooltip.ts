import { tooltipPlaygroundSpec } from '../catalog/specs/tooltip.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { tooltipWebSectionRenderers } from './surfaces/web/tooltip-sections.js';

export { tooltipPlaygroundMeta } from '../catalog/data/meta-tooltip.js';
export { tooltipPlaygroundSpec } from '../catalog/specs/tooltip.spec.js';

export function renderTooltipPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(tooltipPlaygroundSpec, tooltipWebSectionRenderers, root);
}
