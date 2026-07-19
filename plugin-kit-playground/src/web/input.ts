import { inputPlaygroundSpec } from '../catalog/specs/input.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { inputWebSectionRenderers } from './surfaces/web/input-sections.js';

export { inputPlaygroundMeta, inputPlaygroundSections } from '../catalog/data/meta-input.js';
export { inputPlaygroundSpec } from '../catalog/specs/input.spec.js';
export {
    buildCraftInputComparisonHtml,
    inputFieldStates,
    inputMatrixSizes,
    inputPlaygroundComparison,
} from '../catalog/data/comparison.js';

export function renderInputPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(inputPlaygroundSpec, inputWebSectionRenderers, root);
}
