import { colorInputPlaygroundSpec } from '../catalog/specs/color-input.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { colorInputWebSectionRenderers } from './surfaces/web/color-input-sections.js';

export {
    colorInputPlaygroundMeta,
    colorInputPlaygroundSections,
} from '../catalog/data/meta-color-input.js';
export { colorInputPlaygroundSpec } from '../catalog/specs/color-input.spec.js';

export function renderColorInputPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(colorInputPlaygroundSpec, colorInputWebSectionRenderers, root);
}
