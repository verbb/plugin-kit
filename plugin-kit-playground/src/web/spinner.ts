import { spinnerPlaygroundSpec } from '../catalog/specs/spinner.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { spinnerWebSectionRenderers } from './surfaces/web/spinner-sections.js';

export {
    spinnerPlaygroundMeta,
    spinnerPlaygroundSections,
    spinnerMatrixSizes,
    spinnerMatrixTones,
    spinnerButtonVariants,
} from '../catalog/data/meta-spinner.js';
export { buttonLoadingSpinnerSections } from '../catalog/data/meta-button.js';
export { spinnerPlaygroundSpec } from '../catalog/specs/spinner.spec.js';

export function renderSpinnerPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(spinnerPlaygroundSpec, spinnerWebSectionRenderers, root);
}
