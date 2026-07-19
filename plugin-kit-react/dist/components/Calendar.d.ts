import { default as React } from 'react';
import { PkCalendar, PkCalendarDayContent, PkCalendarFirstDayOfWeek, PkCalendarMode, PkCalendarPageBy, PkCalendarSize, PkCalendarView } from '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
/** React facade over `<pk-calendar>`. Behavior and styles live in the web component. */
export declare const PkCalendarElement: import('@lit/react').ReactWebComponent<PkCalendar, {
    onInput: string;
    onChange: string;
    onPkFocusDay: string;
    onPkViewChange: string;
}>;
export declare const Calendar: import('@lit/react').ReactWebComponent<PkCalendar, {
    onInput: string;
    onChange: string;
    onPkFocusDay: string;
    onPkViewChange: string;
}>;
export type CalendarProps = React.ComponentProps<typeof PkCalendarElement>;
export type { PkCalendarDayContent, PkCalendarFirstDayOfWeek, PkCalendarMode, PkCalendarPageBy, PkCalendarSize, PkCalendarView, };
//# sourceMappingURL=Calendar.d.ts.map