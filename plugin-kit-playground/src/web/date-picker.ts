import { datePickerPlaygroundSpec } from '../catalog/specs/date-picker.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { datePickerWebSectionRenderers } from './surfaces/web/date-picker-sections.js';

export { datePickerPlaygroundMeta, datePickerPlaygroundSections } from '../catalog/data/meta-date-picker.js';
export { dateTimePickerPlaygroundSection } from '../catalog/data/meta-date-time-picker.js';
export { datePickerPlaygroundSpec } from '../catalog/specs/date-picker.spec.js';

export function renderDatePickerPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(datePickerPlaygroundSpec, datePickerWebSectionRenderers, root);
}
