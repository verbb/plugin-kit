export const checkboxPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Checkbox',
    description: 'Checkbox with optional label and hint.',
} as const;

export const checkboxPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Icon-only checkbox with `aria-label`.',
        ariaLabel: 'Enable notifications',
    },
    checked: {
        title: 'Checked',
        description: 'Checked state.',
        ariaLabel: 'Enable notifications',
    },
    disabled: {
        title: 'Disabled',
        description: 'Disabled state.',
        ariaLabel: 'Enable notifications',
    },
    hint: {
        title: 'Hint',
        description: '`hint` attribute and hint slot.',
        label: 'Enable notifications',
        hint: 'Receive email updates when form submissions arrive.',
    },
} as const;
