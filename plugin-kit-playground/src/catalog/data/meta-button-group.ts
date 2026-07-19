export const buttonGroupPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Button Group',
    description: 'Visually joined button cluster.',
} as const;

export const buttonGroupPlaygroundSections = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Craft CP toolbar patterns — `.btngroup`, view toggles, preview/share.',
    },
    basicUsage: {
        title: 'Basic usage',
        description: 'Edit / Preview / menubtn toolbar.',
    },
    menuTrigger: {
        title: 'Menu trigger (`group-trigger`)',
        description: '`group-trigger` on `pk-button` — Craft `.menubtn` mapping. Narrow padding, CSS chevron.',
    },
    regularButtons: {
        title: 'Regular buttons',
        description: 'Leading action before grouped controls.',
    },
    separators: {
        title: 'Separators',
        description: 'Default 1px dividers between controls. `separators="false"` for flush join. `pk-button-group-separator` for manual splits.',
    },
    variants: {
        title: 'Variants',
        description: 'Separator colour per button variant.',
    },
    splitActions: {
        title: 'Split actions',
        description: 'Label action + `group-trigger` chevron — Craft `.menubtn`.',
    },
    sizes: {
        title: 'Sizes',
        description: 'Shared button size scale.',
    },
    orientation: {
        title: 'Orientation',
        description: 'Horizontal and vertical groups.',
    },
    toolbarControls: {
        title: 'Toolbar controls',
        description: 'Search, select, input group, and buttons in one bar.',
    },
    dropdown: {
        title: 'Dropdown',
        description: 'Dropdown trigger at group end.',
    },
    popover: {
        title: 'Popover',
        description: 'Popover trigger in a group.',
    },
} as const;
