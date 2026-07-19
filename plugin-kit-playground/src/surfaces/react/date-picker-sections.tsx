import { useRef, useState } from 'react';

import { DatePicker } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { DateTimePickerDemo } from './shared/dateTimePickerDemo.js';
import { DemoValueReadout } from './shared/sectionHelpers.js';

type DatePickerDemoProps = {
    initialValue?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    withClear?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    min?: string;
    max?: string;
    disablePast?: boolean;
    disableFuture?: boolean;
    disabledDaysOfWeek?: string;
    firstDayOfWeek?: string;
    weekdayFormat?: string;
    withOutsideDays?: boolean;
    mode?: 'single' | 'range';
    months?: string;
    isDateDisabled?: (date: Date) => boolean;
};

function DatePickerDemo({
    initialValue = '',
    label,
    placeholder,
    required,
    withClear,
    disabled,
    invalid,
    min,
    max,
    disablePast,
    disableFuture,
    disabledDaysOfWeek,
    firstDayOfWeek,
    weekdayFormat,
    withOutsideDays,
    mode,
    months,
    isDateDisabled,
}: DatePickerDemoProps) {
    const [value, setValue] = useState(initialValue);
    const pickerRef = useRef<HTMLElement & { isDateDisabled?: (date: Date) => boolean }>(null);

    // Wire callback-based disabled dates the same way the web playground does.
    if (isDateDisabled && pickerRef.current) {
        pickerRef.current.isDateDisabled = isDateDisabled;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <DatePicker
                ref={pickerRef as never}
                value={value}
                label={label}
                placeholder={placeholder}
                required={required}
                withClear={withClear}
                disabled={disabled}
                invalid={invalid}
                min={min}
                max={max}
                disablePast={disablePast}
                disableFuture={disableFuture}
                disabledDaysOfWeek={disabledDaysOfWeek}
                firstDayOfWeek={firstDayOfWeek}
                weekdayFormat={weekdayFormat}
                withOutsideDays={withOutsideDays}
                mode={mode}
                months={months}
                onChange={(event) => { setValue((event.target as { value: string }).value); }}
            />
            <DemoValueReadout value={value} />
        </div>
    );
}

/** React previews — one function per section id from datePickerPlaygroundSpec. */
export const datePickerReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: () => (
        <div className="pg-demo-narrow">
            <DatePickerDemo
                initialValue="2026-05-20"
                label="Event date"
                placeholder="Pick a date"
            />
        </div>
    ),

    dateTimePicker: () => (
        <div className="pg-demo-narrow">
            <DateTimePickerDemo />
        </div>
    ),

    states: () => (
        <div className="pg-demo-narrow" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <DatePickerDemo label="Required" required withClear placeholder="Required date" />
            <DatePickerDemo label="Invalid" initialValue="2026-01-15" invalid />
            <DatePickerDemo label="Disabled" initialValue="2026-05-20" disabled />
        </div>
    ),

    constraints: () => (
        <div className="pg-demo-narrow" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <DatePickerDemo label="disable-past" disablePast placeholder="Future dates only" />
            <DatePickerDemo label="disable-future" disableFuture placeholder="Past dates only" />
            <DatePickerDemo
                label='disabled-days-of-week="sat sun"'
                disabledDaysOfWeek="sat sun"
                placeholder="Weekdays only"
            />
            <DatePickerDemo
                label='first-day-of-week="mon"'
                firstDayOfWeek="mon"
                placeholder="Week starts Monday"
            />
            <DatePickerDemo
                label='weekday-format="long"'
                weekdayFormat="long"
                placeholder="Long weekday headers"
            />
            <DatePickerDemo
                label="without outside days"
                withOutsideDays={false}
                placeholder="No adjacent-month days"
            />
            <DatePickerDemo
                label="Bounded range"
                min="2026-01-01"
                max="2026-12-31"
                placeholder="Within 2026"
            />
        </div>
    ),

    range: () => (
        <div className="pg-demo-narrow">
            <DatePickerDemo
                label="Booking"
                mode="range"
                months="2"
                placeholder="Select a range"
            />
        </div>
    ),

    callbacks: function CallbacksSection() {
        const [value, setValue] = useState('');
        const pickerRef = useRef<HTMLElement & { isDateDisabled?: (date: Date) => boolean }>(null);

        if (pickerRef.current) {
            pickerRef.current.isDateDisabled = (date) => {
                const day = date.getDay();
                return day === 0 || day === 6;
            };
        }

        return (
            <div className="pg-demo-narrow">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <DatePicker
                        ref={pickerRef as never}
                        value={value}
                        label="Weekdays only"
                        placeholder="Mon–Fri only"
                        onChange={(event) => { setValue((event.target as { value: string }).value); }}
                    />
                    <DemoValueReadout value={value} />
                </div>
            </div>
        );
    },
};
