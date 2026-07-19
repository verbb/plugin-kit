import { datePickerPlaygroundMeta, datePickerPlaygroundSections } from '../data/meta-date-picker.js';
import { dateTimePickerPlaygroundSection } from '../data/meta-date-time-picker.js';
import type { PlaygroundSpec } from '../types.js';

export type DatePickerSectionId =
    | keyof typeof datePickerPlaygroundSections
    | 'dateTimePicker';

/** Single source of truth for DatePicker playground section order and copy. */
export const datePickerPlaygroundSpec: PlaygroundSpec = {
    meta: datePickerPlaygroundMeta,
    sections: [
        { id: 'basic', overflowVisible: true, ...datePickerPlaygroundSections.basic },
        { id: 'dateTimePicker', overflowVisible: true, ...dateTimePickerPlaygroundSection },
        { id: 'states', overflowVisible: true, ...datePickerPlaygroundSections.states },
        { id: 'constraints', overflowVisible: true, ...datePickerPlaygroundSections.constraints },
        { id: 'range', overflowVisible: true, ...datePickerPlaygroundSections.range },
        { id: 'callbacks', overflowVisible: true, ...datePickerPlaygroundSections.callbacks },
    ],
};

export const datePickerSectionIds = datePickerPlaygroundSpec.sections.map((section) => section.id);
