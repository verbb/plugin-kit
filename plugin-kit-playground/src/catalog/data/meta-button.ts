export const buttonPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Button',
    description: 'Action button — variants, sizes, loading.',
} as const;

export const buttonPlaygroundSections = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Interaction states vs Craft CP.',
    },
    variantsAndSizes: {
        title: 'Variants and Sizes',
        description: 'Full variant × size matrix.',
    },
    icons: {
        title: 'Icons',
        description: 'Icon placement and sizing across variants and sizes.',
    },
    loading: {
        title: 'Loading',
        description: 'Loading state — label length, spinner placement, variant contrast.',
    },
} as const;

export const buttonIconSections = [
    { id: 'icon-variant', title: 'Icon only by variant', withLabel: false, bySize: false },
    { id: 'icon-size', title: 'Icon only by size', withLabel: false, bySize: true },
    { id: 'icon-text-variant', title: 'Icon with label by variant', withLabel: true, bySize: false },
    { id: 'icon-text-size', title: 'Icon with label by size', withLabel: true, bySize: true },
] as const;

export const buttonIconPlacementExamples = [
    { id: 'prepend', label: 'Prepend', startSlot: 'eye' as const },
    { id: 'append', label: 'Append', endSlot: 'eye' as const },
    { id: 'both', label: 'Both', startSlot: 'add' as const, endSlot: 'eye' as const },
    { id: 'add-chevron', label: 'Add entry', startSlot: 'add' as const, endSlot: 'chevron' as const },
    { id: 'icon-only', ariaLabel: 'View', startSlot: 'eye' as const },
] as const;

export const buttonLoadingSections = [
    {
        id: 'text-length',
        title: 'Text length',
        buttons: [
            { label: 'Save', variant: 'primary' as const },
            { label: 'Save changes and continue', variant: 'primary' as const },
        ],
    },
    {
        id: 'variants',
        title: 'Variants',
        fromMatrix: 'variants' as const,
    },
    {
        id: 'primary-sizes',
        title: 'Primary size scale',
        fromMatrix: 'primarySizes' as const,
    },
    {
        id: 'demo-states',
        title: 'Demo states',
        buttons: [
            { label: 'Normal', variant: 'primary' as const },
            { label: 'Hover', variant: 'primary' as const, state: 'hover' as const },
            { label: 'Focus', variant: 'primary' as const, state: 'focus-visible' as const },
            { label: 'Active', variant: 'primary' as const, state: 'active' as const },
            { label: 'Disabled', variant: 'primary' as const, disabled: true },
        ],
    },
] as const;

export const buttonLoadingSpinnerSections = [
    {
        id: 'spinner-overrides',
        title: 'Spinner overrides',
        buttons: [
            { label: 'Primary', variant: 'primary' as const, spinnerVariant: 'outline' as const },
            { label: 'Secondary', variant: 'secondary' as const, spinnerVariant: 'default' as const },
            {
                label: 'None',
                variant: 'none' as const,
                spinnerTone: 'sky' as const,
            },
        ],
    },
] as const;
