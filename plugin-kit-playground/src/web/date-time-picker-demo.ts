import { createPkDatePicker } from './date-picker-helpers.js';

type TimePickerElement = HTMLElement & { value: string };

function pad2(value: string | number): string {
    return String(value).padStart(2, '0');
}

function formatDateTimeValue(date: string, time: string): string {
    if (!date) {
        return '';
    }

    const [hour = '00', minute = '00'] = (time || '00:00').split(':');

    return `${date} ${pad2(hour)}:${pad2(minute)}:00`;
}

function createPkTimePicker(options: {
    value?: string;
    placeholder?: string;
} = {}): TimePickerElement {
    const picker = document.createElement('pk-time-picker') as TimePickerElement;

    for (const [key, val] of Object.entries(options)) {
        if (val !== undefined) {
            picker.setAttribute(key, String(val));
        }
    }

    return picker;
}

export function createDateTimePickerDemo(options: {
    date?: string;
    time?: string;
    datePlaceholder?: string;
    timePlaceholder?: string;
} = {}): HTMLElement {
    const {
        date = '2026-05-20',
        time = '09:00',
        datePlaceholder = 'Pick a date',
        timePlaceholder = 'Select time',
    } = options;

    const stack = document.createElement('div');
    stack.style.display = 'flex';
    stack.style.flexDirection = 'column';
    stack.style.gap = '0.25rem';

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.gap = '0.5rem';
    row.style.alignItems = 'center';

    const datePicker = createPkDatePicker({
        value: date,
        placeholder: datePlaceholder,
    });
    const timePicker = createPkTimePicker({
        value: time,
        placeholder: timePlaceholder,
    });

    row.append(datePicker, timePicker);

    const output = document.createElement('div');
    output.className = 'pg-demo-output';
    output.style.fontSize = '11px';
    output.style.color = 'var(--pk-color-gray-500)';

    const sync = (): void => {
        const combined = formatDateTimeValue(datePicker.value, timePicker.value);
        output.innerHTML = [
            `Date: <code>${datePicker.value || '(empty)'}</code>`,
            `Time: <code>${timePicker.value || '(empty)'}</code>`,
            `Value: <code>${combined || '(empty)'}</code>`,
        ].join(' · ');
    };

    datePicker.addEventListener('change', sync);
    timePicker.addEventListener('change', sync);
    sync();

    stack.append(row, output);

    return stack;
}
