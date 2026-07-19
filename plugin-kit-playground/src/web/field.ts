import { fieldPlaygroundSpec } from '../catalog/specs/field.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { fieldWebSectionRenderers } from './surfaces/web/field-sections.js';

export {
    fieldPlaygroundMeta,
    fieldPlaygroundSections,
} from '../catalog/data/meta-field.js';
export { fieldPlaygroundSpec } from '../catalog/specs/field.spec.js';

export function renderFieldPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(fieldPlaygroundSpec, fieldWebSectionRenderers, root);
}
