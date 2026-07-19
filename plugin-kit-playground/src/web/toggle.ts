import { togglePlaygroundSpec } from '../catalog/specs/toggle.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { toggleWebSectionRenderers } from './surfaces/web/toggle-sections.js';

export {
    togglePlaygroundMeta,
    togglePlaygroundSections,
} from '../catalog/data/meta-toggle.js';
export { togglePlaygroundSpec } from '../catalog/specs/toggle.spec.js';

export function renderTogglePlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(togglePlaygroundSpec, toggleWebSectionRenderers, root);
}
