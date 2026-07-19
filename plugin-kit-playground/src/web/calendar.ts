import { calendarPlaygroundSpec } from '../catalog/specs/calendar.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { calendarWebSectionRenderers } from './surfaces/web/calendar-sections.js';

export { calendarPlaygroundMeta } from '../catalog/data/meta-calendar.js';
export { calendarPlaygroundSpec } from '../catalog/specs/calendar.spec.js';

export function renderCalendarPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(calendarPlaygroundSpec, calendarWebSectionRenderers, root);
}
