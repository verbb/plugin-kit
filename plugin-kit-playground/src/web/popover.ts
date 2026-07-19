import { popoverPlaygroundSpec } from '../catalog/specs/popover.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { popoverWebSectionRenderers } from './surfaces/web/popover-sections.js';

export {
    popoverPlaygroundMeta,
    popoverPlaygroundSections,
} from '../catalog/data/meta-popover.js';
export { popoverPlaygroundSpec } from '../catalog/specs/popover.spec.js';

export function renderPopoverPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(popoverPlaygroundSpec, popoverWebSectionRenderers, root);
}
