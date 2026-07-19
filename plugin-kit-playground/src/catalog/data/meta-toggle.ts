export const togglePlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Toggle',
    description: 'Binary pressed/unpressed button.',
} as const;

export const togglePlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Single toggle with pressed state.',
        label: 'Bold',
    },
    variants: {
        title: 'Variants',
        description: 'Visual variants.',
    },
    sizes: {
        title: 'Sizes',
        description: 'Size scale.',
    },
    pressed: {
        title: 'Pressed',
        description: 'Selected state.',
        label: 'Pressed',
    },
    disabled: {
        title: 'Disabled',
        description: 'Disabled state.',
        label: 'Disabled',
    },
} as const;
