export const inputPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Input',
    description: 'Single-line text field.',
} as const;

export const inputPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Placeholder and default value.',
        placeholder: 'Search entries',
    },
    sizes: {
        title: 'Sizes',
        description: 'xs through lg.',
    },
    widths: {
        title: 'Widths',
        description: 'Full-width default and fixed width.',
        fullWidthPlaceholder: 'Full width by default',
        fixedWidthPlaceholder: 'Fixed width',
    },
    validation: {
        title: 'Validation',
        description: '`invalid` state.',
        placeholder: 'Invalid',
    },
    disabled: {
        title: 'Disabled',
        description: 'Disabled state.',
        placeholder: 'Disabled',
    },
    inputGroup: {
        title: 'Input group',
        description: 'Addons, buttons, and helper content in one shell. Control first in DOM, then addons with `align`.',
    },
    inputGroupIcon: {
        title: 'Icon',
        description: 'Start and end icon addons.',
        placeholder: 'Search...',
    },
    inputGroupText: {
        title: 'Text',
        description: 'Prefix and suffix text addons.',
        currencyPlaceholder: '0.00',
        urlPlaceholder: 'example.com',
        emailPlaceholder: 'name',
        charsLeft: '120 characters left',
    },
    inputGroupButton: {
        title: 'Button',
        description: 'Inline button addon.',
        urlPlaceholder: 'example.com/contact',
        buttonLabel: 'Search',
    },
} as const;
