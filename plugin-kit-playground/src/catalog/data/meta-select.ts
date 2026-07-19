export const selectPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Select',
    description: 'Dropdown option picker.',
} as const;

export const selectPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Trigger and option list.',
    },
    sizes: {
        title: 'Sizes',
        description: 'xs through lg.',
        items: [
            { label: 'Extra small', size: 'xs' },
            { label: 'Small', size: 'sm' },
            { label: 'Default', size: 'default' },
            { label: 'Large', size: 'lg' },
        ] as const,
    },
    widths: {
        title: 'Widths',
        description: 'Content width by default. Fixed width on host or `width="full"`.',
    },
    grouped: {
        title: 'Grouped options',
        description: 'Labels and separators between option sets.',
    },
    longList: {
        title: 'Long lists',
        description: 'Scrollable panel with max-height overflow.',
    },
    decorations: {
        title: 'Start & end decorations',
        description: '`start` and `end` slots on the trigger.',
        items: [
            { label: 'Extra small', size: 'xs' },
            { label: 'Small', size: 'sm' },
            { label: 'Medium', size: 'default' },
            { label: 'Large', size: 'lg' },
            { label: 'Extra large', size: 'xl' },
        ] as const,
    },
    statusInput: {
        title: 'Status input',
        description: '`slot="start"` on `pk-option` with `pk-status`. Selected decoration shown in the trigger.',
    },
    multiple: {
        title: 'Multiple',
        description: '`multiple` selection.',
    },
    clearable: {
        title: 'Clearable',
        description: 'Emits `pk-clear` on reset.',
    },
} as const;

export const selectFruitItems = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
] as const;

/** Enough items to overflow the default panel max-height. */
export const selectLargeFruitItems = [
    ...selectFruitItems,
    { value: 'cherry', label: 'Cherry' },
    { value: 'coconut', label: 'Coconut' },
    { value: 'cranberry', label: 'Cranberry' },
    { value: 'fig', label: 'Fig' },
    { value: 'grapefruit', label: 'Grapefruit' },
    { value: 'guava', label: 'Guava' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'lime', label: 'Lime' },
    { value: 'mango', label: 'Mango' },
    { value: 'melon', label: 'Melon' },
    { value: 'orange', label: 'Orange' },
    { value: 'papaya', label: 'Papaya' },
    { value: 'peach', label: 'Peach' },
    { value: 'pear', label: 'Pear' },
    { value: 'plum', label: 'Plum' },
    { value: 'pomegranate', label: 'Pomegranate' },
    { value: 'raspberry', label: 'Raspberry' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' },
] as const;

export const selectStatusItems = [
    { value: 'draft', label: 'Draft' },
    { value: 'review', label: 'In Review' },
    { value: 'published', label: 'Published' },
] as const;

export const selectStatusInputItems = [
    { value: 'new', label: 'New', status: 'green' },
    { value: 'testing', label: 'Testing', status: 'blue' },
    { value: 'viewed', label: 'Viewed', status: 'purple' },
] as const;
