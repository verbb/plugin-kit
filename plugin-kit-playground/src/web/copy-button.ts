import { copyButtonPlaygroundSpec } from '../catalog/specs/copy-button.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { copyButtonWebSectionRenderers } from './surfaces/web/copy-button-sections.js';

export { copyButtonPlaygroundMeta } from '../catalog/data/meta-copy-button.js';
export { copyButtonPlaygroundSpec } from '../catalog/specs/copy-button.spec.js';

export function renderCopyButtonPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(copyButtonPlaygroundSpec, copyButtonWebSectionRenderers, root);
}
