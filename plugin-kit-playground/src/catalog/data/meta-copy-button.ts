export const copyButtonPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'CopyButton',
    description: 'Copies text to clipboard.',
} as const;

export const copyButtonPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Copy button beside a read-only value field.',
        value: 'https://verbb.io',
    },
    variants: {
        title: 'Variants',
        description: 'default, outline, transparent, none.',
        value: 'FORMIE_LICENSE_KEY',
        variants: ['default', 'outline', 'transparent', 'none'] as const,
    },
} as const;
