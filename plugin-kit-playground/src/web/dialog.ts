import { dialogPlaygroundSpec } from '../catalog/specs/dialog.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { dialogWebSectionRenderers } from './surfaces/web/dialog-sections.js';

export {
    dialogPlaygroundMeta,
    dialogPlaygroundSections,
} from '../catalog/data/meta-dialog.js';
export { dialogPlaygroundSpec } from '../catalog/specs/dialog.spec.js';

export function renderDialogPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(dialogPlaygroundSpec, dialogWebSectionRenderers, root);
}
