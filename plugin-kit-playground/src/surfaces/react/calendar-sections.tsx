import { useState, type CSSProperties, type ReactNode } from 'react';

import { Calendar } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

type CalendarDemoProps = Record<string, string | boolean | undefined> & {
    initialValue: string;
    caption?: string;
    stackStyle?: CSSProperties;
};

function CalendarValueReadout({ value }: { value: string }) {
    return (
        <div
            className="pg-demo-output"
            style={{ fontSize: '11px', color: 'var(--pk-color-gray-500)' }}
        >
            Value: <code>{value || '(empty)'}</code>
        </div>
    );
}

function CalendarDemo({
    initialValue,
    caption,
    stackStyle,
    ...calendarProps
}: CalendarDemoProps) {
    const [value, setValue] = useState(initialValue);

    const content = (
        <>
            <Calendar
                value={value}
                {...calendarProps}
                onChange={(event) => { setValue((event.target as { value: string }).value); }}
            />
            <CalendarValueReadout value={value} />
        </>
    );

    if (!caption) {
        return content;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', ...stackStyle }}>
            <div className="pg-spinner-size-label">{caption}</div>
            {content}
        </div>
    );
}

function CalendarStack({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
    return (
        <div
            className={narrow ? 'pg-demo-narrow' : undefined}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
            {children}
        </div>
    );
}

/** React previews — one function per section id from calendarPlaygroundSpec. */
export const calendarReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: () => (
        <div className="pg-demo-narrow">
            <CalendarDemo initialValue="2026-05-11" />
        </div>
    ),

    constraints: () => (
        <div className="pg-demo-narrow">
            <CalendarDemo
                initialValue="2026-05-15"
                min="2026-05-08"
                max="2026-05-22"
            />
        </div>
    ),

    range: () => (
        <div className="pg-demo-narrow">
            <CalendarDemo initialValue="2026-05-11/2026-05-18" mode="range" />
        </div>
    ),

    dualMonth: () => (
        <div style={{ overflowX: 'auto' }}>
            <CalendarDemo
                initialValue="2026-05-11/2026-05-25"
                mode="range"
                months="2"
            />
        </div>
    ),

    weekNumbers: () => (
        <div className="pg-demo-narrow">
            <CalendarDemo initialValue="2026-05-11" withWeekNumbers />
        </div>
    ),

    viewStepper: () => (
        <div className="pg-demo-narrow">
            <p style={{ fontSize: '11px', color: 'var(--pk-color-gray-500)', margin: 0 }}>
                Click the month/year title to step into month and year views.
            </p>
            <CalendarDemo initialValue="2026-05-11" />
        </div>
    ),

    disablePastFuture: () => (
        <CalendarStack narrow>
            <CalendarDemo
                caption="disable-past — today is 15 May 2026"
                initialValue="2026-05-20"
                today="2026-05-15"
                disablePast
            />
            <CalendarDemo
                caption="disable-future — today is 15 May 2026"
                initialValue="2026-05-10"
                today="2026-05-15"
                disableFuture
            />
        </CalendarStack>
    ),

    disabledDaysOfWeek: () => (
        <div className="pg-demo-narrow">
            <CalendarDemo
                caption='disabled-days-of-week="sat sun"'
                initialValue="2026-05-16"
                disabledDaysOfWeek="sat sun"
            />
        </div>
    ),

    firstDayOfWeek: () => (
        <CalendarStack narrow>
            <CalendarDemo
                caption='first-day-of-week="auto" (locale default)'
                initialValue="2026-05-11"
            />
            <CalendarDemo
                caption='first-day-of-week="mon"'
                initialValue="2026-05-11"
                firstDayOfWeek="mon"
            />
        </CalendarStack>
    ),

    weekdayFormat: () => (
        <CalendarStack narrow>
            <CalendarDemo
                caption='weekday-format="narrow" (default)'
                initialValue="2026-05-11"
                weekdayFormat="narrow"
            />
            <CalendarDemo
                caption='weekday-format="short"'
                initialValue="2026-05-11"
                weekdayFormat="short"
            />
            <CalendarDemo
                caption='weekday-format="long"'
                initialValue="2026-05-11"
                weekdayFormat="long"
            />
        </CalendarStack>
    ),

    outsideDays: () => (
        <CalendarStack narrow>
            <CalendarDemo
                caption="with-outside-days (default)"
                initialValue="2026-05-11"
                withOutsideDays
            />
            <CalendarDemo
                caption="without outside days"
                initialValue="2026-05-11"
                withOutsideDays={false}
            />
        </CalendarStack>
    ),
};
