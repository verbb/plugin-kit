import { iconPlaygroundSpec } from '../catalog/specs/icon.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { iconWebSectionRenderers } from './surfaces/web/icon-sections.js';

export {
    iconPlaygroundMeta,
    iconPlaygroundSections,
    iconGalleryNames,
    iconCommonNames,
} from '../catalog/data/meta-icon.js';
export { iconPlaygroundSpec } from '../catalog/specs/icon.spec.js';

export function renderIconPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(iconPlaygroundSpec, iconWebSectionRenderers, root);
}
