import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import {
    PkCalendar,
    type PkCalendarDayContent,
    type PkCalendarFirstDayOfWeek,
    type PkCalendarMode,
    type PkCalendarPageBy,
    type PkCalendarSize,
    type PkCalendarView,
} from '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';

/** React facade over `<pk-calendar>`. Behavior and styles live in the web component. */
export const PkCalendarElement = createPluginKitComponent({
    tagName: 'pk-calendar',
    elementClass: PkCalendar,
    react: React,
    events: {
        onInput: 'input',
        onChange: 'change',
        onPkFocusDay: 'pk-focus-day',
        onPkViewChange: 'pk-view-change',
    },
});

export const Calendar = PkCalendarElement;
export type CalendarProps = React.ComponentProps<typeof PkCalendarElement>;
export type {
    PkCalendarDayContent,
    PkCalendarFirstDayOfWeek,
    PkCalendarMode,
    PkCalendarPageBy,
    PkCalendarSize,
    PkCalendarView,
};
