import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createDateTimePickerDemo } from '../../date-time-picker-demo.js';

type TimePickerElement = HTMLElement & { value: string };

function createPkTimePicker(options: {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
} = {}): TimePickerElement {
    const picker = document.createElement('pk-time-picker') as TimePickerElement;

    for (const [key, val] of Object.entries(options)) {
        if (val === true) {
            picker.setAttribute(key, '');
        } else if (val !== undefined && val !== false) {
            picker.setAttribute(key, String(val));
        }
    }

    return picker;
}

function createValueReadout(picker: TimePickerElement): HTMLElement {
    const output = document.createElement('div');
    output.className = 'pg-demo-output';
    output.style.fontSize = '11px';
    output.style.color = 'var(--pk-color-gray-500)';

    const sync = (): void => {
        output.innerHTML = `Value: <code>${picker.value || '(empty)'}</code>`;
    };

    picker.addEventListener('change', sync);
    sync();

    return output;
}

function createStatefulDemo(
    options: Parameters<typeof createPkTimePicker>[0],
): HTMLElement {
    const stack = document.createElement('div');
    stack.style.display = 'flex';
    stack.style.flexDirection = 'column';
    stack.style.gap = '0.25rem';

    const picker = createPkTimePicker(options);
    stack.append(picker, createValueReadout(picker));

    return stack;
}

/** Web component previews — one function per section id from timePickerPlaygroundSpec. */
export const timePickerWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createStatefulDemo({
            value: '09:00',
            placeholder: 'Select time',
        }));
    },

    dateTimePicker(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createDateTimePickerDemo());
    },

    empty(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createStatefulDemo({
            placeholder: 'Select time',
        }));
    },

    states(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.display = 'flex';
        preview.style.flexDirection = 'column';
        preview.style.gap = '1rem';

        preview.append(
            createStatefulDemo({
                value: '14:30',
                invalid: true,
            }),
            createStatefulDemo({
                value: '09:00',
                disabled: true,
            }),
        );
    },
};
