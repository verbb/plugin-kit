import { editableTablePlaygroundSpec } from '../catalog/specs/editable-table.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { editableTableWebSectionRenderers } from './surfaces/web/editable-table-sections.js';

export { editableTablePlaygroundMeta } from '../catalog/data/meta-editable-table.js';
export { editableTablePlaygroundSpec } from '../catalog/specs/editable-table.spec.js';

export function renderEditableTablePlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(editableTablePlaygroundSpec, editableTableWebSectionRenderers, root);
}
