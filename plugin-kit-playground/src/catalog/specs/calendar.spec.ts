import { calendarPlaygroundMeta, calendarPlaygroundSections } from '../data/meta-calendar.js';
import type { PlaygroundSpec } from '../types.js';

export type CalendarSectionId = keyof typeof calendarPlaygroundSections;

/** Single source of truth for Calendar playground section order and copy. */
export const calendarPlaygroundSpec: PlaygroundSpec = {
    meta: calendarPlaygroundMeta,
    sections: [
        { id: 'basic', ...calendarPlaygroundSections.basic },
        { id: 'constraints', ...calendarPlaygroundSections.constraints },
        { id: 'range', ...calendarPlaygroundSections.range },
        { id: 'dualMonth', overflowVisible: true, ...calendarPlaygroundSections.dualMonth },
        { id: 'weekNumbers', ...calendarPlaygroundSections.weekNumbers },
        { id: 'viewStepper', ...calendarPlaygroundSections.viewStepper },
        { id: 'disablePastFuture', ...calendarPlaygroundSections.disablePastFuture },
        { id: 'disabledDaysOfWeek', ...calendarPlaygroundSections.disabledDaysOfWeek },
        { id: 'firstDayOfWeek', ...calendarPlaygroundSections.firstDayOfWeek },
        { id: 'weekdayFormat', ...calendarPlaygroundSections.weekdayFormat },
        { id: 'outsideDays', ...calendarPlaygroundSections.outsideDays },
    ],
};

export const calendarSectionIds = calendarPlaygroundSpec.sections.map((section) => section.id);
