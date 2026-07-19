export const radioGroupPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'RadioGroup',
    description: 'Single-choice option set.',
} as const;

export const radioGroupPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Mutually exclusive options with keyboard navigation.',
    },
    supportingDescriptions: {
        title: 'Supporting descriptions',
        description: 'Secondary line under each option label.',
    },
    disabledOptions: {
        title: 'Disabled options',
        description: 'Individual disabled options.',
    },
    layoutAndError: {
        title: 'Layout and error',
        description: 'Horizontal layout and group-level invalid state.',
        errorMessage: 'Choose an available notification channel.',
    },
} as const;
