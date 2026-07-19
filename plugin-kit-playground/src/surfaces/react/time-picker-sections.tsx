import { useState } from 'react';

import { TimePicker } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { DateTimePickerDemo } from './shared/dateTimePickerDemo.js';
import { DemoValueReadout } from './shared/sectionHelpers.js';

function TimePickerDemo({
    initialValue = '',
    placeholder,
    disabled,
    invalid,
}: {
    initialValue?: string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
}) {
    const [value, setValue] = useState(initialValue);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <TimePicker
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                invalid={invalid}
                onChange={(event) => { setValue((event.target as { value: string }).value); }}
            />
            <DemoValueReadout value={value} />
        </div>
    );
}

/** React previews — one function per section id from timePickerPlaygroundSpec. */
export const timePickerReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: () => (
        <div className="pg-demo-narrow">
            <TimePickerDemo initialValue="09:00" placeholder="Select time" />
        </div>
    ),

    dateTimePicker: () => (
        <div className="pg-demo-narrow">
            <DateTimePickerDemo />
        </div>
    ),

    empty: () => (
        <div className="pg-demo-narrow">
            <TimePickerDemo placeholder="Select time" />
        </div>
    ),

    states: () => (
        <div className="pg-demo-narrow" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TimePickerDemo initialValue="14:30" invalid />
            <TimePickerDemo initialValue="09:00" disabled />
        </div>
    ),
};
