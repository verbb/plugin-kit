import { checkboxSelectPlaygroundSpec } from '../catalog/specs/checkbox-select.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { checkboxSelectWebSectionRenderers } from './surfaces/web/checkbox-select-sections.js';

export {
    buildCraftCheckboxSelectComparisonHtml,
    checkboxSelectComparisonOptions,
    checkboxSelectPlaygroundComparison,
} from '../catalog/data/comparison.js';
export { checkboxSelectPlaygroundMeta } from '../catalog/data/meta-checkbox-select.js';
export { checkboxSelectPlaygroundSpec } from '../catalog/specs/checkbox-select.spec.js';

export function renderCheckboxSelectPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(checkboxSelectPlaygroundSpec, checkboxSelectWebSectionRenderers, root);
}
