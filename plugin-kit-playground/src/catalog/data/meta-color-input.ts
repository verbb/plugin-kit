export const colorInputPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'ColorInput',
    description: 'Color swatch and hex text field.',
} as const;

export const colorInputPlaygroundSections = {
    basic: {
        title: 'Basic usage',
        description: 'Swatch and editable hex value.',
    },
    resolved: {
        title: 'Resolved values',
        description: 'Shorthand values resolved to full hex.',
    },
    sizes: {
        title: 'Sizes',
        description: 'Size scale.',
    },
    states: {
        title: 'States',
        description: 'Invalid and disabled.',
    },
} as const;
