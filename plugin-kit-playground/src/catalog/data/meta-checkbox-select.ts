export const checkboxSelectPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'CheckboxSelect',
    description: 'Checkbox list for multi-select.',
} as const;

export const checkboxSelectPlaygroundSections = {
    basic: {
        title: 'Basic usage',
        description: 'Multiple selection.',
    },
    withAll: {
        title: 'With “All” option',
        description: 'Master checkbox selects every option.',
    },
    withLabel: {
        title: 'Field layout',
        description: '`pk-field` wrapper with label and instructions.',
        fieldLabel: 'Forms to monitor',
        fieldInstructions: 'Choose which forms should trigger notifications.',
    },
} as const;
