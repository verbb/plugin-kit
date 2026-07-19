import { textareaPlaygroundSpec } from '../catalog/specs/textarea.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { initTextareaCharacterCount, textareaWebSectionRenderers } from './surfaces/web/textarea-sections.js';

export { textareaPlaygroundMeta } from '../catalog/data/meta-textarea.js';
export { textareaPlaygroundSpec } from '../catalog/specs/textarea.spec.js';
export {
    buildCraftTextareaComparisonHtml,
    textareaFieldStates,
    textareaPlaygroundComparison,
} from '../catalog/data/comparison.js';

export function renderTextareaPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(textareaPlaygroundSpec, textareaWebSectionRenderers, root);
    initTextareaCharacterCount(root);
}
