import { selectPlaygroundSpec } from '../catalog/specs/select.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { selectWebSectionRenderers } from './surfaces/web/select-sections.js';

export {
    selectFruitItems,
    selectLargeFruitItems,
    selectPlaygroundMeta,
    selectPlaygroundSections,
    selectStatusInputItems,
    selectStatusItems,
} from '../catalog/data/meta-select.js';
export { selectPlaygroundSpec } from '../catalog/specs/select.spec.js';
export { selectPlaygroundComparison } from '../catalog/data/comparison.js';

export function renderSelectPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(selectPlaygroundSpec, selectWebSectionRenderers, root);
}
