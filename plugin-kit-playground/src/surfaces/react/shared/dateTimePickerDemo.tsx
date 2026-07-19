import { useState } from 'react';

import { DatePicker } from '@verbb/plugin-kit-react/components';
import { TimePicker } from '@verbb/plugin-kit-react/components';

import { DemoValueReadout } from './sectionHelpers.js';

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

type DateTimePickerDemoProps = {
    date?: string;
    time?: string;
    datePlaceholder?: string;
    timePlaceholder?: string;
};

/** Shared date + time picker row used by date-picker and time-picker playground sections. */
export function DateTimePickerDemo({
    date: initialDate = '2026-05-20',
    time: initialTime = '09:00',
    datePlaceholder = 'Pick a date',
    timePlaceholder = 'Select time',
}: DateTimePickerDemoProps) {
    const [date, setDate] = useState(initialDate);
    const [time, setTime] = useState(initialTime);

    const combined = formatDateTimeValue(date, time);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                <DatePicker
                    value={date}
                    placeholder={datePlaceholder}
                    onChange={(event) => { setDate((event.target as { value: string }).value); }}
                />
                <TimePicker
                    value={time}
                    placeholder={timePlaceholder}
                    onChange={(event) => { setTime((event.target as { value: string }).value); }}
                />
            </div>
            <div
                className="pg-demo-output"
                style={{ fontSize: '11px', color: 'var(--pk-color-gray-500)' }}
            >
                Date: <code>{date || '(empty)'}</code>
                {' · '}
                Time: <code>{time || '(empty)'}</code>
                {' · '}
                Value: <code>{combined || '(empty)'}</code>
            </div>
        </div>
    );
}
