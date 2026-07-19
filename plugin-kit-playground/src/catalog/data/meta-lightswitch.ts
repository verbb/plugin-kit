export const lightswitchPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Lightswitch',
    description: 'On/off toggle switch.',
} as const;

export const lightswitchPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Default switch.',
    },
    sizes: {
        title: 'Sizes',
        description: 'xxs, xs, sm, default.',
        items: [
            { label: 'Extra extra small', size: 'xxs' as const },
            { label: 'Extra small', size: 'xs' as const },
            { label: 'Small', size: 'sm' as const },
            { label: 'Default', size: 'default' as const },
        ],
    },
    checked: {
        title: 'Checked',
        description: 'On state.',
    },
    disabled: {
        title: 'Disabled',
        description: 'Disabled state.',
    },
    labels: {
        title: 'Labels',
        description: 'Simple label, title, and description variants.',
        simpleLabel: 'Enable notifications',
        titleLabel: 'Auto-save drafts',
        descriptionLabel: 'Save form changes while editing.',
    },
} as const;
