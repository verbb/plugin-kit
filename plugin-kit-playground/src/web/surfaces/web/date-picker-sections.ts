import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createDateTimePickerDemo } from '../../date-time-picker-demo.js';
import {
    createPkDatePicker,
    createStatefulDemo,
    createValueReadout,
} from '../../date-picker-helpers.js';

/** Web component previews — one function per section id from datePickerPlaygroundSpec. */
export const datePickerWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createStatefulDemo({
            label: 'Event date',
            value: '2026-05-20',
            placeholder: 'Pick a date',
        }));
    },

    dateTimePicker(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createDateTimePickerDemo());
    },

    states(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.gap = '1rem';

        preview.append(
            createStatefulDemo({
                label: 'Required',
                required: true,
                'with-clear': true,
                placeholder: 'Required date',
            }),
            createStatefulDemo({
                label: 'Invalid',
                value: '2026-01-15',
                invalid: true,
            }),
            createStatefulDemo({
                label: 'Disabled',
                value: '2026-05-20',
                disabled: true,
            }),
        );
    },

    constraints(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.gap = '1rem';

        preview.append(
            createStatefulDemo({
                label: 'disable-past',
                'disable-past': true,
                placeholder: 'Future dates only',
            }),
            createStatefulDemo({
                label: 'disable-future',
                'disable-future': true,
                placeholder: 'Past dates only',
            }),
            createStatefulDemo({
                label: 'disabled-days-of-week="sat sun"',
                'disabled-days-of-week': 'sat sun',
                placeholder: 'Weekdays only',
            }),
            createStatefulDemo({
                label: 'first-day-of-week="mon"',
                'first-day-of-week': 'mon',
                placeholder: 'Week starts Monday',
            }),
            createStatefulDemo({
                label: 'weekday-format="long"',
                'weekday-format': 'long',
                placeholder: 'Long weekday headers',
            }),
            createStatefulDemo({
                label: 'without outside days',
                'with-outside-days': false,
                placeholder: 'No adjacent-month days',
            }),
            createStatefulDemo({
                label: 'Bounded range',
                min: '2026-01-01',
                max: '2026-12-31',
                placeholder: 'Within 2026',
            }),
        );
    },

    range(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createStatefulDemo({
            label: 'Booking',
            mode: 'range',
            months: '2',
            placeholder: 'Select a range',
        }));
    },

    multiple(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createStatefulDemo({
            label: 'Availability',
            mode: 'multiple',
            value: '2026-05-04,2026-05-20',
            placeholder: 'Select dates',
        }));
    },

    callbacks(preview) {
        preview.classList.add('pg-demo-narrow');

        const input = createPkDatePicker({
            label: 'Weekdays only',
            placeholder: 'Mon–Fri only',
        });

        input.isDateDisabled = (date) => {
            const day = date.getDay();
            return day === 0 || day === 6;
        };

        const stack = document.createElement('div');
        stack.style.display = 'flex';
        stack.style.flexDirection = 'column';
        stack.style.gap = '0.25rem';
        stack.append(input, createValueReadout(input));

        preview.append(stack);
    },
};
