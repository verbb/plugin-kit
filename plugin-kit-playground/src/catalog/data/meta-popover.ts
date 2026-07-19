export const popoverPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Popover',
    description: 'Anchored floating panel.',
} as const;

export const popoverPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Trigger and content container.',
        triggerLabel: 'Open popover',
        title: 'Popover title',
        descriptionText: 'Position popovers near the control they support.',
    },
    placement: {
        title: 'Placement',
        description: 'top, right, bottom, left.',
        sides: ['top', 'right', 'bottom', 'left'] as const,
    },
    formContent: {
        title: 'Form content',
        description: 'Compact form controls inside the panel.',
        triggerLabel: 'Edit shortcut',
        titleText: 'Quick edit',
        descriptionText: 'Compact contextual edit panel.',
        inputValue: 'Primary action',
    },
    withArrow: {
        title: 'With arrow',
        description: 'Optional floating-ui arrow toward the trigger (`with-arrow`).',
        sides: ['top', 'right', 'bottom', 'left'] as const,
        contentTitle: 'Arrow popover',
        contentDescription: 'The arrow tracks placement and stays aimed at the trigger.',
    },
} as const;
