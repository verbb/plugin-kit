export const dropdownMenuPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'DropdownMenu',
    description: 'Action menu from a trigger.',
} as const;

export const dropdownMenuPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Chevron trigger, action items, separator, destructive action. Default `side-offset` is 4px.',
        triggerLabel: 'Options',
    },
    grouped: {
        title: 'Grouped options',
        description: 'Labels, separators, shortcuts, checkbox items, radio items.',
        triggerLabel: 'Actions',
    },
    triggers: {
        title: 'Different triggers',
        description: 'Labelled button, avatar, and icon-only triggers.',
    },
    submenus: {
        title: 'Submenus',
        description: 'Nested menus on hover.',
        triggerLabel: 'Open',
    },
    selection: {
        title: 'Selection items',
        description: 'Checkbox and radio items that persist state.',
        triggerLabel: 'View options',
    },
    disabledItems: {
        title: 'Disabled items',
        description: '`disabled` attribute — skipped by keyboard focus.',
        triggerLabel: 'Field actions',
    },
    icons: {
        title: 'Items with icons',
        description: 'Leading icons in the `prefix` slot.',
    },
    sizes: {
        title: 'Sizes',
        description: '`size` on `pk-dropdown-menu` scales items, labels, and icons together.',
    },
} as const;
