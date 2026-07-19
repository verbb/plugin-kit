import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/calendar.js';

/** Vue facade over `<pk-calendar>`. Behavior and styles live in the web component. */
export const Calendar = createPkComponent({
    name: 'PkCalendar',
    tagName: 'pk-calendar',
});

export const PkCalendarElement = Calendar;

export type CalendarProps = Record<string, unknown>;
