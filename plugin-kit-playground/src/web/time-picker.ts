import { timePickerPlaygroundSpec } from '../catalog/specs/time-picker.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { timePickerWebSectionRenderers } from './surfaces/web/time-picker-sections.js';

export { timePickerPlaygroundMeta } from '../catalog/data/meta-time-picker.js';
export { timePickerPlaygroundSpec } from '../catalog/specs/time-picker.spec.js';

export function renderTimePickerPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(timePickerPlaygroundSpec, timePickerWebSectionRenderers, root);
}
