import { checkboxPlaygroundSpec } from '../catalog/specs/checkbox.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { checkboxWebSectionRenderers } from './surfaces/web/checkbox-sections.js';

export {
    checkboxPlaygroundMeta,
    checkboxPlaygroundSections,
} from '../catalog/data/meta-checkbox.js';
export {
    buildCraftCheckboxComparisonHtml,
    checkboxCheckedStates,
    checkboxPlaygroundComparison,
    checkboxUncheckedStates,
} from '../catalog/data/comparison.js';
export { checkboxPlaygroundSpec } from '../catalog/specs/checkbox.spec.js';

export function renderCheckboxPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(checkboxPlaygroundSpec, checkboxWebSectionRenderers, root);
}
