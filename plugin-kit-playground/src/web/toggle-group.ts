import { toggleGroupPlaygroundSpec } from '../catalog/specs/toggle-group.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { toggleGroupWebSectionRenderers } from './surfaces/web/toggle-group-sections.js';

export {
    toggleGroupPlaygroundMeta,
    toggleGroupPlaygroundSections,
} from '../catalog/data/meta-toggle-group.js';
export { toggleGroupPlaygroundSpec } from '../catalog/specs/toggle-group.spec.js';

export function renderToggleGroupPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(toggleGroupPlaygroundSpec, toggleGroupWebSectionRenderers, root);
}
