export const textareaPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Textarea',
    description: 'Multi-line text field.',
} as const;

export const textareaPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Default textarea.',
        placeholder: 'Write something...',
    },
    sizes: {
        title: 'Sizes',
        description: 'Size scale.',
    },
    widths: {
        title: 'Widths',
        description: 'Full-width default and fixed width.',
        fullWidthPlaceholder: 'Full width by default',
        fixedWidthPlaceholder: 'Fixed width',
    },
    validation: {
        title: 'Validation',
        description: 'Invalid state.',
        placeholder: 'Invalid',
    },
    disabled: {
        title: 'Disabled',
        description: 'Disabled state.',
        placeholder: 'Disabled',
    },
    resize: {
        title: 'Resize',
        description: 'Vertical resize handle.',
        value: 'Try dragging the resize handle.\n\nIt should resize vertically.',
    },
    characterCount: {
        title: 'Character count',
        description: 'Character count addon.',
        maxLength: 120,
        defaultValue: 'Short helper text for a settings screen.',
    },
    inputGroup: {
        title: 'Input group',
        description: 'Block-start and block-end addons.',
        placeholder: 'Write a message...',
        headerLabel: 'script.js',
        footerCount: '0/280',
        footerAction: 'Post',
    },
} as const;
