export const toggleGroupPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'ToggleGroup',
    description: 'Grouped toggle buttons.',
} as const;

export const toggleGroupPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Joined horizontal group.',
        items: [
            { value: 'left', ariaLabel: 'Align left' },
            { value: 'center', ariaLabel: 'Align center' },
            { value: 'right', ariaLabel: 'Align right' },
        ] as const,
    },
    variants: {
        title: 'Variants',
        description: 'Default and outline variants.',
        defaultItems: [
            { value: 'bold', ariaLabel: 'Bold' },
            { value: 'italic', ariaLabel: 'Italic' },
            { value: 'underline', ariaLabel: 'Underline' },
        ] as const,
        outlineItems: [
            { value: 'outline-bold', ariaLabel: 'Bold' },
            { value: 'outline-italic', ariaLabel: 'Italic' },
            { value: 'outline-underline', ariaLabel: 'Underline' },
        ] as const,
    },
    sizes: {
        title: 'Sizes',
        description: 'Size scale.',
        items: [
            { value: 'bold', ariaLabel: 'Bold' },
            { value: 'italic', ariaLabel: 'Italic' },
            { value: 'underline', ariaLabel: 'Underline' },
        ] as const,
    },
    orientation: {
        title: 'Orientation',
        description: 'Horizontal and vertical groups.',
        horizontalItems: [
            { value: 'h-left', ariaLabel: 'Align left' },
            { value: 'h-center', ariaLabel: 'Align center' },
            { value: 'h-right', ariaLabel: 'Align right' },
        ] as const,
        verticalItems: [
            { value: 'v-left', ariaLabel: 'Align left' },
            { value: 'v-center', ariaLabel: 'Align center' },
            { value: 'v-right', ariaLabel: 'Align right' },
        ] as const,
    },
    spacing: {
        title: 'Spacing',
        description: 'Loose spacing between items.',
        items: [
            { value: 'left', ariaLabel: 'Align left' },
            { value: 'center', ariaLabel: 'Align center' },
            { value: 'right', ariaLabel: 'Align right' },
        ] as const,
    },
    selection: {
        title: 'Selection modes',
        description: 'Single and multiple selection.',
        singleItems: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
        ] as const,
        multipleItems: [
            { value: 'bold', label: 'Bold' },
            { value: 'italic', label: 'Italic' },
            { value: 'underline', label: 'Underline' },
        ] as const,
    },
} as const;
