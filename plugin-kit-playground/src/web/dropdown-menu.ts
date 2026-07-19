import { dropdownMenuPlaygroundSpec } from '../catalog/specs/dropdown-menu.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { dropdownMenuWebSectionRenderers } from './surfaces/web/dropdown-menu-sections.js';

export {
    dropdownMenuPlaygroundMeta,
    dropdownMenuPlaygroundSections,
} from '../catalog/data/meta-dropdown-menu.js';
export { dropdownMenuPlaygroundSpec } from '../catalog/specs/dropdown-menu.spec.js';

export function renderDropdownMenuPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(dropdownMenuPlaygroundSpec, dropdownMenuWebSectionRenderers, root);
}
