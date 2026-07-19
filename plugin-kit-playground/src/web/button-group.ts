import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { buttonGroupPlaygroundSpec } from '../catalog/specs/button-group.spec.js';
import { buttonGroupWebSectionRenderers } from './surfaces/web/button-group-sections.js';

export { buttonGroupPlaygroundMeta, buttonGroupPlaygroundSections } from '../catalog/data/meta-button-group.js';
export { buttonGroupPlaygroundSpec } from '../catalog/specs/button-group.spec.js';
export {
    buildCraftButtonGroupComparisonHtml,
    buttonGroupPlaygroundComparison,
    craftBtngroupMarkup,
    craftContextMenuMarkup,
    craftEditPreviewMenubtnMarkup,
    craftNewEntryBtngroupMarkup,
    craftPreviewViewBtngroupMarkup,
    craftViewModeBtngroupMarkup,
} from '../catalog/data/comparison.js';

export function renderButtonGroupPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(buttonGroupPlaygroundSpec, buttonGroupWebSectionRenderers, root);
}
