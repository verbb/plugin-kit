import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { buttonPlaygroundSpec } from '../catalog/specs/button.spec.js';
import { buttonWebSectionRenderers } from './surfaces/web/button-sections.js';

export {
    buttonPlaygroundMeta,
    buttonPlaygroundSections,
    buttonIconSections,
    buttonIconPlacementExamples,
    buttonLoadingSections,
    buttonLoadingSpinnerSections,
} from '../catalog/data/meta-button.js';
export { buttonPlaygroundSpec } from '../catalog/specs/button.spec.js';
export { buttonMatrixSizes, buttonMatrixStates, buttonMatrixVariants } from '../catalog/data/button-matrix.js';

export function renderButtonPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(buttonPlaygroundSpec, buttonWebSectionRenderers, root);
}
