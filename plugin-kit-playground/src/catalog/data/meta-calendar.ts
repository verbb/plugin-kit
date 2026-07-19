export const calendarPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Calendar',
    description: 'Inline date grid — single date and range.',
} as const;

export const calendarPlaygroundSections = {
    basic: {
        title: 'Basic usage',
        description: 'Single-day selection. Value is ISO `YYYY-MM-DD`.',
    },
    constraints: {
        title: 'Min & max',
        description: 'Dates outside the allowed range are disabled.',
    },
    range: {
        title: 'Date range',
        description: 'Range mode commits `YYYY-MM-DD/YYYY-MM-DD` after the second click.',
    },
    dualMonth: {
        title: 'Two-month display',
        description: '`months="2"` — two months side by side.',
    },
    weekNumbers: {
        title: 'Week numbers',
        description: 'ISO 8601 week numbers in a leading column.',
    },
    viewStepper: {
        title: 'View stepper',
        description: 'Header title switches between day, month, and year views.',
    },
    disablePastFuture: {
        title: 'Disable past & future',
        description: '`disable-past` and `disable-future`.',
    },
    disabledDaysOfWeek: {
        title: 'Disabling days of the week',
        description: '`disabled-days-of-week` — space-separated weekday names (`sun`, `mon`, …).',
    },
    firstDayOfWeek: {
        title: 'First day of the week',
        description: 'Defaults to locale with `first-day-of-week="auto"`. Override with a weekday name.',
    },
    weekdayFormat: {
        title: 'Weekday format',
        description: '`weekday-format="narrow"`, `"short"`, or `"long"`.',
    },
    outsideDays: {
        title: 'Outside days',
        description: '`with-outside-days` — trailing and leading days from adjacent months.',
    },
} as const;
