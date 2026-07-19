export const timePickerPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'TimePicker',
    description: 'Time-of-day select field — 30-minute increments.',
} as const;

export const timePickerPlaygroundSections = {
    basic: {
        title: 'Basic usage',
        description: 'Value in `HH:mm` (24-hour storage, 12-hour display by default).',
    },
    empty: {
        title: 'Empty state',
        description: 'Placeholder with no value.',
    },
    states: {
        title: 'States',
        description: 'Invalid and disabled.',
    },
} as const;
