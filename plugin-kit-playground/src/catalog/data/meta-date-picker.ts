export const datePickerPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'DatePicker',
    description: 'Date field with popup calendar.',
} as const;

export const datePickerPlaygroundSections = {
    basic: {
        title: 'Basic usage',
        description: 'Popup calendar on click. Alt+ArrowDown opens the panel.',
    },
    states: {
        title: 'States',
        description: 'Required, clearable, disabled, and invalid.',
    },
    constraints: {
        title: 'Constraints',
        description: 'Disable past/future dates, weekdays, min, and max.',
    },
    range: {
        title: 'Date range',
        description: 'Range mode with two visible months.',
    },
    callbacks: {
        title: 'Custom disabling',
        description: '`isDateDisabled` callback.',
    },
} as const;
