import { radioGroupPlaygroundSpec } from '../catalog/specs/radio-group.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { radioGroupWebSectionRenderers } from './surfaces/web/radio-group-sections.js';

export {
    radioGroupPlaygroundMeta,
    radioGroupPlaygroundSections,
} from '../catalog/data/meta-radio-group.js';
export { radioGroupPlaygroundSpec } from '../catalog/specs/radio-group.spec.js';
export {
    buildCraftRadioComparisonHtml,
    radioCheckedStates,
    radioPlaygroundComparison,
    radioUncheckedStates,
} from '../catalog/data/comparison.js';

export function renderRadioGroupPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(radioGroupPlaygroundSpec, radioGroupWebSectionRenderers, root);
}
