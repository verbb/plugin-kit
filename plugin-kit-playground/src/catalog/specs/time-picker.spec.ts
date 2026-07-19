import { dateTimePickerPlaygroundSection } from '../data/meta-date-time-picker.js';
import { timePickerPlaygroundMeta, timePickerPlaygroundSections } from '../data/meta-time-picker.js';
import type { PlaygroundSpec } from '../types.js';

export type TimePickerSectionId =
    | keyof typeof timePickerPlaygroundSections
    | 'dateTimePicker';

/** Single source of truth for TimePicker playground section order and copy. */
export const timePickerPlaygroundSpec: PlaygroundSpec = {
    meta: timePickerPlaygroundMeta,
    sections: [
        { id: 'basic', ...timePickerPlaygroundSections.basic },
        { id: 'dateTimePicker', ...dateTimePickerPlaygroundSection },
        { id: 'empty', ...timePickerPlaygroundSections.empty },
        { id: 'states', ...timePickerPlaygroundSections.states },
    ],
};

export const timePickerSectionIds = timePickerPlaygroundSpec.sections.map((section) => section.id);
